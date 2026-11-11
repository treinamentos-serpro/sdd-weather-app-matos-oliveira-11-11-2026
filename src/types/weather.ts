/**
 * Contratos de domínio compartilhados do Weather App.
 *
 * Decisão de arquitetura: as temperaturas são sempre armazenadas em Celsius
 * internamente e convertidas apenas na camada de apresentação. Assim, a troca
 * de unidade (C/F) nunca dispara um novo request.
 */

export type Unit = 'celsius' | 'fahrenheit';

/** Resultado da API de geocoding (uma cidade). */
export interface City {
  id: number;
  name: string;
  country: string;
  /** Estado/região, quando disponível (ajuda a desambiguar homônimos). */
  admin1?: string;
  latitude: number;
  longitude: number;
}

/** Condições atuais. Temperatura sempre em °C. */
export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  precipitation: number;
  time: string;
}

/** Um dia da previsão. Temperaturas sempre em °C. */
export interface ForecastDay {
  date: string;
  min: number;
  max: number;
  weatherCode: number;
  precipitationProbability: number;
}

/** Agregado entregue à UI: cidade + clima atual + 5 dias de previsão. */
export interface WeatherData {
  city: City;
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export namespace WeatherDomain {
  export type Unit = 'celsius' | 'fahrenheit';
  export type Instant = number;
  export type CalendarDate = string;
  export type Measurement = number | null;

  export interface Coordinates {
    latitude: number;
    longitude: number;
  }

  export interface City extends Coordinates {
    id: number;
    name: string;
    country: string | null;
    region: string | null;
  }

  export interface CityCandidate {
    city: City | null;
    label: string;
    selectable: boolean;
    reason: 'invalid-position' | 'ambiguous' | null;
  }

  export type SelectedLocation =
    | { kind: 'manual'; city: City }
    | { kind: 'device'; coordinates: Coordinates; label: 'Localização atual' };

  export interface CurrentWeather {
    temperatureC: Measurement;
    apparentTemperatureC: Measurement;
    weatherCode: number | null;
    humidityPercent: Measurement;
    windSpeedKmh: Measurement;
    referenceAt: Instant | null;
  }

  export interface ForecastHour {
    at: Instant;
    temperatureC: Measurement;
    weatherCode: number | null;
    precipitationProbabilityPercent: Measurement;
  }

  export interface ForecastDay {
    date: CalendarDate;
    minC: Measurement;
    maxC: Measurement;
    weatherCode: number | null;
    maxPrecipitationProbabilityPercent: Measurement;
    hours: ForecastHour[];
    hourlyCoverage: 'complete' | 'partial' | 'unavailable';
  }

  export interface WeatherData {
    location: SelectedLocation;
    timezone: 'America/Sao_Paulo';
    receivedAt: Instant;
    current: CurrentWeather | null;
    forecast: ForecastDay[];
    completeness: 'complete' | 'partial';
  }

  export type Freshness = 'recent' | 'older-than-60-minutes' | 'unverifiable';

  export interface Preferences {
    unit: Unit;
    city: City | null;
  }

  export type ErrorCode =
    | 'invalid-input'
    | 'network'
    | 'timeout'
    | 'rate-limit'
    | 'provider'
    | 'invalid-data'
    | 'permission-denied'
    | 'position-unavailable'
    | 'unsupported'
    | 'storage-unavailable';

  export interface AppError {
    code: ErrorCode;
    retryable: boolean;
    httpStatus?: number;
  }

  export interface WeatherService {
    searchCities(query: string, signal: AbortSignal): Promise<CityCandidate[]>;
    getWeather(location: SelectedLocation, signal: AbortSignal): Promise<WeatherData>;
  }

  export interface PreferencesService {
    read(): Preferences;
    writeUnit(unit: Unit): boolean;
    writeCity(city: City): boolean;
    clear(): boolean;
  }

  export interface GeolocationService {
    requestPosition(signal: AbortSignal): Promise<Coordinates>;
  }

  export interface DiagnosticEvent {
    category: ErrorCode;
    operation: 'search' | 'forecast' | 'location' | 'preferences';
    httpStatus?: number;
    durationMs: number;
    at: Instant;
  }
}
