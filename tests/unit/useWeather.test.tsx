import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useWeather } from '../../src/hooks/useWeather';
import { getWeather, searchCities, WeatherServiceError } from '../../src/services/weatherService';
import type { City, WeatherData } from '../../src/types/weather';

vi.mock('../../src/services/weatherService', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../src/services/weatherService')>()),
  searchCities: vi.fn(),
  getWeather: vi.fn(),
}));

const lisboa: City = {
  id: 1,
  name: 'Lisboa',
  country: 'Portugal',
  latitude: 38.7,
  longitude: -9.1,
};
const porto: City = { id: 2, name: 'Porto', country: 'Portugal', latitude: 41.1, longitude: -8.6 };

function weatherFor(city: City): WeatherData {
  return {
    city,
    current: {
      temperature: 20,
      weatherCode: 0,
      humidity: 50,
      windSpeed: 5,
      pressure: 1010,
      precipitation: 0,
      time: '2026-11-11T10:00',
    },
    forecast: [],
  };
}

describe('useWeather', () => {
  beforeEach(() => {
    vi.mocked(searchCities).mockReset();
    vi.mocked(getWeather).mockReset();
  });

  it('inicia em idle', () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.status).toBe('idle');
    expect(result.current.data).toBeNull();
  });

  it('busca cidades e carrega o clima da primeira', async () => {
    vi.mocked(searchCities).mockResolvedValue([lisboa, porto]);
    vi.mocked(getWeather).mockResolvedValue(weatherFor(lisboa));
    const { result } = renderHook(() => useWeather());

    await act(() => result.current.search('  Lisboa '));

    expect(searchCities).toHaveBeenCalledWith('Lisboa');
    expect(getWeather).toHaveBeenCalledWith(lisboa);
    expect(result.current.status).toBe('success');
    expect(result.current.query).toBe('Lisboa');
    expect(result.current.cities).toEqual([lisboa, porto]);
    expect(result.current.data?.city).toEqual(lisboa);
  });

  it('usa status empty quando não há resultados', async () => {
    vi.mocked(searchCities).mockResolvedValue([]);
    const { result } = renderHook(() => useWeather());

    await act(() => result.current.search('xyz'));

    expect(result.current.status).toBe('empty');
    expect(getWeather).not.toHaveBeenCalled();
  });

  it('não busca com input vazio', async () => {
    const { result } = renderHook(() => useWeather());
    await act(() => result.current.search('   '));
    expect(searchCities).not.toHaveBeenCalled();
    expect(result.current.status).toBe('idle');
  });

  it('selectCity carrega o clima da cidade escolhida', async () => {
    vi.mocked(getWeather).mockResolvedValue(weatherFor(porto));
    const { result } = renderHook(() => useWeather());

    await act(() => result.current.selectCity(porto));

    expect(result.current.status).toBe('success');
    expect(result.current.data?.city).toEqual(porto);
  });

  it('retry refaz a busca quando a busca de cidades falhou', async () => {
    vi.mocked(getWeather).mockResolvedValue(weatherFor(porto));
    const { result } = renderHook(() => useWeather());
    await act(() => result.current.selectCity(porto));

    vi.mocked(searchCities).mockRejectedValueOnce(new WeatherServiceError('Falha de rede.'));
    await act(() => result.current.search('Lisboa'));
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Falha de rede.');

    vi.mocked(searchCities).mockResolvedValue([lisboa]);
    vi.mocked(getWeather).mockResolvedValue(weatherFor(lisboa));
    await act(() => result.current.retry());

    expect(searchCities).toHaveBeenLastCalledWith('Lisboa');
    expect(result.current.status).toBe('success');
    expect(result.current.data?.city).toEqual(lisboa);
  });

  it('mostra mensagem amigável offline na busca e retry repete a busca', async () => {
    vi.mocked(searchCities).mockRejectedValueOnce(new WeatherServiceError('Falha de rede.'));
    const { result } = renderHook(() => useWeather());

    await act(() => result.current.search('Lisboa'));
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Falha de rede.');

    vi.mocked(searchCities).mockResolvedValue([lisboa]);
    vi.mocked(getWeather).mockResolvedValue(weatherFor(lisboa));
    await act(() => result.current.retry());

    expect(searchCities).toHaveBeenLastCalledWith('Lisboa');
    expect(result.current.status).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('retry recarrega o clima da última cidade quando a previsão falhou', async () => {
    vi.mocked(searchCities).mockResolvedValue([lisboa]);
    vi.mocked(getWeather).mockRejectedValueOnce(new WeatherServiceError('Falha de rede.'));
    const { result } = renderHook(() => useWeather());
    await act(() => result.current.search('Lisboa'));
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Falha de rede.');

    vi.mocked(getWeather).mockResolvedValue(weatherFor(lisboa));
    await act(() => result.current.retry());

    expect(searchCities).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe('success');
  });
});
