import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CurrentWeather from '../../src/components/CurrentWeather';
import type { City, CurrentWeather as CurrentWeatherData, Unit } from '../../src/types/weather';

const city: City = {
  id: 1,
  name: 'São Paulo',
  country: 'Brasil',
  admin1: 'São Paulo',
  latitude: -23.55,
  longitude: -46.63,
};

const current: CurrentWeatherData = {
  temperature: 20,
  weatherCode: 2,
  humidity: 70,
  windSpeed: 12,
  precipitation: 1.2,
  pressure: 1015,
  time: '2026-11-11T10:00',
};

describe('CurrentWeather', () => {
  it('exibe cidade, condição, clima atual e métricas', () => {
    render(<CurrentWeather city={city} current={current} unit="celsius" />);

    expect(screen.getByRole('region', { name: 'Clima atual' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'São Paulo' })).toBeInTheDocument();
    expect(screen.getByText('20°')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
    expect(screen.getByText('Parcialmente nublado')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
    expect(screen.getByText('12 km/h')).toBeInTheDocument();
    expect(screen.getByText('1.2 mm')).toBeInTheDocument();
    expect(screen.getByText('1015 hPa')).toBeInTheDocument();
  });

  it.each([
    ['celsius', '20°', 'C'],
    ['fahrenheit', '68°', 'F'],
  ] as const satisfies readonly (readonly [
    Unit,
    string,
    string,
  ])[])('formata a temperatura em %s', (unit, temperature, label) => {
    render(<CurrentWeather city={city} current={current} unit={unit} />);

    expect(screen.getByText(temperature)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
