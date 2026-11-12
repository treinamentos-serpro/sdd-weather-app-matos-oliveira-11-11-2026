import type { City, CurrentWeather, ForecastDay, WeatherData } from '../types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const REQUEST_TIMEOUT_MS = 10_000;

/** Erro tipado da camada de dados, com mensagem amigável ao usuário. */
export class WeatherServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

/** Mantém o timeout ativo até o consumidor terminar de ler a resposta. */
export async function fetchWithTimeout<T>(
  url: string,
  consumeResponse: (response: Response) => Promise<T> = async (response) => response as T,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await consumeResponse(response);
  } catch (err) {
    if (err instanceof WeatherServiceError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new WeatherServiceError('A requisição demorou demais.');
    }
    if (err instanceof SyntaxError) {
      throw new WeatherServiceError('A resposta do serviço está inválida. Tente novamente.');
    }
    throw new WeatherServiceError('Falha de rede.');
  } finally {
    clearTimeout(timeout);
  }
}

interface GeocodingResult {
  id?: number | null;
  name?: string | null;
  country?: string | null;
  admin1?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mapCity(value: unknown): City | null {
  if (!isRecord(value)) return null;
  const { id, name, latitude, longitude } = value as GeocodingResult;
  if (
    typeof id !== 'number' ||
    !Number.isFinite(id) ||
    typeof name !== 'string' ||
    !name.trim() ||
    typeof latitude !== 'number' ||
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    typeof longitude !== 'number' ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return {
    id,
    name,
    country: typeof value.country === 'string' ? value.country : '',
    admin1: typeof value.admin1 === 'string' ? value.admin1 : undefined,
    latitude,
    longitude,
  };
}

/**
 * Busca cidades por nome (geocoding). Retorna lista vazia quando não há
 * resultados — o estado "vazio" é tratado pela camada de UI.
 */
export async function searchCities(name: string): Promise<City[]> {
  const query = name.trim();
  if (!query) return [];

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`;
  return fetchWithTimeout(url, async (res) => {
    if (!res.ok) {
      throw new WeatherServiceError('Não foi possível buscar a cidade. Tente novamente.');
    }

    const payload: unknown = await res.json();
    if (!isRecord(payload)) {
      throw new WeatherServiceError('Resposta de busca inválida. Tente novamente.');
    }
    const data = payload as { results?: unknown };
    if (data.results == null) return [];
    if (!Array.isArray(data.results)) {
      throw new WeatherServiceError('Resposta de busca inválida. Tente novamente.');
    }

    return data.results.map(mapCity).filter((city): city is City => city !== null);
  });
}

type ApiMeasurement = number | null;

interface ForecastResponse {
  current?: {
    time?: string | null;
    temperature_2m?: ApiMeasurement;
    relative_humidity_2m?: ApiMeasurement;
    wind_speed_10m?: ApiMeasurement;
    surface_pressure?: ApiMeasurement;
    precipitation?: ApiMeasurement;
    weather_code?: ApiMeasurement;
  } | null;
  daily?: {
    time?: (string | null)[] | null;
    weather_code?: ApiMeasurement[] | null;
    temperature_2m_max?: ApiMeasurement[] | null;
    temperature_2m_min?: ApiMeasurement[] | null;
    precipitation_probability_max?: ApiMeasurement[] | null;
  } | null;
}

function finiteOrNull(value: ApiMeasurement | undefined): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function boundedOrNull(value: ApiMeasurement | undefined, min: number, max: number): number | null {
  const number = finiteOrNull(value);
  return number !== null && number >= min && number <= max ? number : null;
}

function nonNegativeOrNull(value: ApiMeasurement | undefined): number | null {
  const number = finiteOrNull(value);
  return number !== null && number >= 0 ? number : null;
}

function weatherCodeOrNull(value: ApiMeasurement | undefined): number | null {
  const number = finiteOrNull(value);
  return number !== null && Number.isInteger(number) ? number : null;
}

function calendarDateOrNull(value: string | null | undefined): string | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : value;
}

function mapCurrent(c: NonNullable<ForecastResponse['current']>): CurrentWeather {
  return {
    time: typeof c.time === 'string' && c.time.trim() ? c.time : null,
    temperature: finiteOrNull(c.temperature_2m),
    humidity: boundedOrNull(c.relative_humidity_2m, 0, 100),
    windSpeed: nonNegativeOrNull(c.wind_speed_10m),
    pressure: nonNegativeOrNull(c.surface_pressure),
    precipitation: nonNegativeOrNull(c.precipitation),
    weatherCode: weatherCodeOrNull(c.weather_code),
  };
}

function mapForecast(d: NonNullable<ForecastResponse['daily']>): ForecastDay[] {
  return Array.from({ length: 5 }, (_, i) => {
    const date = calendarDateOrNull(d.time?.[i]);
    const min = date === null ? null : finiteOrNull(d.temperature_2m_min?.[i]);
    const max = date === null ? null : finiteOrNull(d.temperature_2m_max?.[i]);
    const validTemperatureRange = min === null || max === null || min <= max;

    return {
      date,
      weatherCode: date === null ? null : weatherCodeOrNull(d.weather_code?.[i]),
      min: validTemperatureRange ? min : null,
      max: validTemperatureRange ? max : null,
      precipitationProbability:
        date === null ? null : boundedOrNull(d.precipitation_probability_max?.[i], 0, 100),
    };
  });
}

/**
 * Busca o clima atual e a previsão de 5 dias para uma cidade.
 * Temperaturas retornam em Celsius (conversão fica na UI).
 */
export async function getWeather(city: City): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      'temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,precipitation,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    forecast_days: '5',
    timezone: 'auto',
  });

  return fetchWithTimeout(`${FORECAST_URL}?${params.toString()}`, async (res) => {
    if (!res.ok) {
      throw new WeatherServiceError('Não foi possível carregar o clima. Tente novamente.');
    }

    const payload: unknown = await res.json();
    if (!isRecord(payload) || !isRecord(payload.current) || !isRecord(payload.daily)) {
      throw new WeatherServiceError('Resposta de clima incompleta. Tente novamente.');
    }
    const data = payload as unknown as ForecastResponse;

    return {
      city,
      current: mapCurrent(data.current as NonNullable<ForecastResponse['current']>),
      forecast: mapForecast(data.daily as NonNullable<ForecastResponse['daily']>),
    };
  });
}
