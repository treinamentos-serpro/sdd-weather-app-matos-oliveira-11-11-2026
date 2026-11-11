import type { City, ForecastDay, WeatherData, WeatherDomain } from '../types/weather';

const city = {
  id: 3448439,
  name: 'São Paulo',
  country: 'Brasil',
  region: 'São Paulo',
  admin1: 'São Paulo',
  latitude: -23.55,
  longitude: -46.63,
} satisfies City & WeatherDomain.City;

function forecastDay(
  date: string,
  minC: number,
  maxC: number,
  weatherCode: number,
  probability: number,
): ForecastDay & WeatherDomain.ForecastDay {
  return {
    date,
    min: minC,
    max: maxC,
    minC,
    maxC,
    weatherCode,
    precipitationProbability: probability,
    maxPrecipitationProbabilityPercent: probability,
    hours: [
      {
        at: Date.parse(`${date}T15:00:00Z`),
        temperatureC: maxC,
        weatherCode,
        precipitationProbabilityPercent: probability,
      },
    ],
    hourlyCoverage: 'partial',
  };
}

export const mockWeatherData = {
  city,
  location: { kind: 'manual', city },
  timezone: 'America/Sao_Paulo',
  receivedAt: Date.parse('2026-11-11T13:30:00Z'),
  current: {
    temperature: 24,
    temperatureC: 24,
    apparentTemperatureC: 25,
    weatherCode: 2,
    humidity: 65,
    humidityPercent: 65,
    windSpeed: 12,
    windSpeedKmh: 12,
    pressure: 1014,
    precipitation: 0,
    time: '2026-11-11T10:00',
    referenceAt: Date.parse('2026-11-11T13:00:00Z'),
  },
  forecast: [
    forecastDay('2026-11-11', 19, 27, 2, 20),
    forecastDay('2026-11-12', 18, 26, 3, 40),
    forecastDay('2026-11-13', 17, 23, 61, 80),
    forecastDay('2026-11-14', 18, 25, 3, 30),
    forecastDay('2026-11-15', 19, 28, 1, 10),
  ],
  completeness: 'partial',
} satisfies WeatherData & WeatherDomain.WeatherData;
