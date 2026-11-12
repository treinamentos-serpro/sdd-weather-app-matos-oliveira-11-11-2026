import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fetchWithTimeout,
  getWeather,
  searchCities,
  WeatherServiceError,
} from '../../src/services/weatherService';
import type { City } from '../../src/types/weather';

const CITY: City = {
  id: 1,
  name: 'Seattle',
  country: 'Estados Unidos',
  admin1: 'Washington',
  latitude: 47.6,
  longitude: -122.33,
};

function mockFetchOnce(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  } as Response);
}

describe('weatherService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('fetchWithTimeout', () => {
    it('converte timeout em WeatherServiceError e limpa o timer', async () => {
      vi.useFakeTimers();
      const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
      vi.stubGlobal(
        'fetch',
        vi.fn(
          (_url: string, init: RequestInit) =>
            new Promise((_resolve, reject) => {
              init.signal?.addEventListener('abort', () =>
                reject(new DOMException('aborted', 'AbortError')),
              );
            }),
        ),
      );

      const assertion = expect(fetchWithTimeout('https://example.test')).rejects.toThrow(
        'A requisição demorou demais.',
      );
      await vi.advanceTimersByTimeAsync(10_000);
      await assertion;
      expect(clearSpy).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('mantém o timeout ativo durante a leitura do corpo', async () => {
      vi.useFakeTimers();
      vi.stubGlobal(
        'fetch',
        vi.fn((_url: string, init: RequestInit) =>
          Promise.resolve({
            json: () =>
              new Promise((_resolve, reject) => {
                init.signal?.addEventListener('abort', () =>
                  reject(new DOMException('aborted', 'AbortError')),
                );
              }),
          } as Response),
        ),
      );

      const request = fetchWithTimeout('https://example.test', (response) => response.json());
      const assertion = expect(request).rejects.toThrow('A requisição demorou demais.');
      await vi.advanceTimersByTimeAsync(10_000);
      await assertion;
      vi.useRealTimers();
    });

    it('converte falha de rede em WeatherServiceError', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
      const promise = fetchWithTimeout('https://example.test');
      await expect(promise).rejects.toBeInstanceOf(WeatherServiceError);
      await expect(promise).rejects.toThrow('Falha de rede.');
    });
  });

  describe('searchCities', () => {
    it('retorna lista vazia para input vazio sem chamar a rede', async () => {
      const fetchSpy = vi.fn();
      vi.stubGlobal('fetch', fetchSpy);
      const result = await searchCities('   ');
      expect(result).toEqual([]);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('mapeia resultados de geocoding', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          results: [
            {
              id: 1,
              name: 'Seattle',
              country: 'Estados Unidos',
              admin1: 'Washington',
              latitude: 47.6,
              longitude: -122.33,
            },
          ],
        }),
      );
      const result = await searchCities('Seattle');
      expect(result).toEqual([
        {
          id: 1,
          name: 'Seattle',
          country: 'Estados Unidos',
          admin1: 'Washington',
          latitude: 47.6,
          longitude: -122.33,
        },
      ]);
    });

    it('codifica caracteres especiais sem perder acentos ou hífens', async () => {
      const fetchSpy = mockFetchOnce({ results: [] });
      vi.stubGlobal('fetch', fetchSpy);
      const query = "São-Paulo O'Fallon";

      await searchCities(query);

      expect(fetchSpy.mock.calls[0][0]).toContain(`name=${encodeURIComponent(query)}`);
      expect(new URL(fetchSpy.mock.calls[0][0] as string).searchParams.get('name')).toBe(query);
    });

    it('retorna vazio quando não há results', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}));
      expect(await searchCities('xyzxyz')).toEqual([]);
    });

    it('descarta resultados sem identidade ou coordenadas válidas', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          results: [
            null,
            { id: 2, name: null, latitude: 10, longitude: 20 },
            { id: 3, name: 'Lisboa', latitude: 38.7, longitude: -9.1 },
          ],
        }),
      );

      await expect(searchCities('Lisboa')).resolves.toEqual([
        {
          id: 3,
          name: 'Lisboa',
          country: '',
          admin1: undefined,
          latitude: 38.7,
          longitude: -9.1,
        },
      ]);
    });

    it('trata corpo JSON nulo como resposta inválida', async () => {
      vi.stubGlobal('fetch', mockFetchOnce(null));
      await expect(searchCities('Lisboa')).rejects.toBeInstanceOf(WeatherServiceError);
    });

    it('lança erro tipado em resposta não-ok', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}, false));
      await expect(searchCities('Seattle')).rejects.toBeInstanceOf(WeatherServiceError);
    });
  });

  describe('getWeather', () => {
    it('mapeia current e daily para WeatherData', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          current: {
            time: '2026-06-16T12:00',
            temperature_2m: 18,
            relative_humidity_2m: 80,
            wind_speed_10m: 10,
            surface_pressure: 1015,
            precipitation: 0,
            weather_code: 3,
          },
          daily: {
            time: ['2026-06-16', '2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20'],
            weather_code: [3, 61, 80, 1, 0],
            temperature_2m_max: [20, 19, 22, 24, 25],
            temperature_2m_min: [12, 11, 13, 14, 15],
            precipitation_probability_max: [20, 90, 70, 10, 0],
          },
        }),
      );

      const data = await getWeather(CITY);
      expect(data.current).toEqual({
        time: '2026-06-16T12:00',
        temperature: 18,
        humidity: 80,
        windSpeed: 10,
        pressure: 1015,
        precipitation: 0,
        weatherCode: 3,
      });
      expect(data.forecast).toEqual([
        { date: '2026-06-16', weatherCode: 3, max: 20, min: 12, precipitationProbability: 20 },
        { date: '2026-06-17', weatherCode: 61, max: 19, min: 11, precipitationProbability: 90 },
        { date: '2026-06-18', weatherCode: 80, max: 22, min: 13, precipitationProbability: 70 },
        { date: '2026-06-19', weatherCode: 1, max: 24, min: 14, precipitationProbability: 10 },
        { date: '2026-06-20', weatherCode: 0, max: 25, min: 15, precipitationProbability: 0 },
      ]);
      expect(data.forecast[4].precipitationProbability).toBe(0);
    });

    it('preserva precipitação ausente sem confundir com zero válido', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          current: {
            time: '2026-06-16T12:00',
            temperature_2m: 18,
            relative_humidity_2m: 80,
            wind_speed_10m: 10,
            surface_pressure: 1015,
            precipitation: 0,
            weather_code: 3,
          },
          daily: {
            time: ['2026-06-16', '2026-06-17'],
            weather_code: [3, 61],
            temperature_2m_max: [20, 19],
            temperature_2m_min: [12, 11],
            precipitation_probability_max: [null, 0],
          },
        }),
      );

      const data = await getWeather(CITY);
      expect(data.forecast[0].precipitationProbability).toBeNull();
      expect(data.forecast[1].precipitationProbability).toBe(0);
    });

    it('normaliza campos atuais ausentes e valores fora dos limites para null', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          current: {
            time: null,
            temperature_2m: null,
            relative_humidity_2m: 101,
            wind_speed_10m: -1,
            surface_pressure: Number.NaN,
            weather_code: null,
          },
          daily: { time: [] },
        }),
      );

      const data = await getWeather(CITY);
      expect(data.current).toEqual({
        time: null,
        temperature: null,
        humidity: null,
        windSpeed: null,
        pressure: null,
        precipitation: null,
        weatherCode: null,
      });
      expect(data.forecast).toHaveLength(5);
      expect(data.forecast.every((day) => day.date === null)).toBe(true);
    });

    it('mantém campos diários válidos e invalida mínima maior que máxima', async () => {
      vi.stubGlobal(
        'fetch',
        mockFetchOnce({
          current: {},
          daily: {
            time: ['2026-11-12'],
            weather_code: [3],
            temperature_2m_min: [30],
            temperature_2m_max: [20],
            precipitation_probability_max: [0],
          },
        }),
      );

      const data = await getWeather(CITY);
      expect(data.forecast[0]).toEqual({
        date: '2026-11-12',
        weatherCode: 3,
        min: null,
        max: null,
        precipitationProbability: 0,
      });
      expect(data.forecast).toHaveLength(5);
      expect(data.forecast[1].date).toBeNull();
    });

    it('lança erro tipado quando forecast retorna status não-ok', async () => {
      vi.stubGlobal('fetch', mockFetchOnce({}, false));
      await expect(getWeather(CITY)).rejects.toBeInstanceOf(WeatherServiceError);
    });

    it.each([
      ['current', { daily: { time: [] } }],
      ['daily', { current: { temperature_2m: 18 } }],
    ])('lança erro quando %s está ausente', async (_missing, body) => {
      vi.stubGlobal('fetch', mockFetchOnce(body));
      const request = getWeather(CITY);
      await expect(request).rejects.toThrow('Resposta de clima incompleta.');
      await expect(request).rejects.toBeInstanceOf(WeatherServiceError);
    });
  });
});
