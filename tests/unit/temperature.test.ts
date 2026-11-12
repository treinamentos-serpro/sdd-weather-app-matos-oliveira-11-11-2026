import { describe, expect, it } from 'vitest';
import {
  convertTemperature,
  formatTemperature,
  toFahrenheit,
  unitLabel,
} from '../../src/lib/temperature';

describe('temperature', () => {
  it('converte Celsius para Fahrenheit corretamente', () => {
    expect(toFahrenheit(0)).toBe(32);
    expect(toFahrenheit(100)).toBe(212);
    expect(toFahrenheit(-40)).toBe(-40);
  });

  it('convertTemperature respeita a unidade', () => {
    expect(convertTemperature(20, 'celsius')).toBe(20);
    expect(convertTemperature(0, 'fahrenheit')).toBe(32);
    expect(convertTemperature(10, 'fahrenheit')).toBe(50);
    expect(convertTemperature(-10, 'fahrenheit')).toBe(14);
    expect(convertTemperature(12.5, 'fahrenheit')).toBe(54.5);
  });

  it('formata com símbolo de grau e arredondamento', () => {
    expect(formatTemperature(20.4, 'celsius')).toBe('20°');
    expect(formatTemperature(20.6, 'celsius')).toBe('21°');
    expect(formatTemperature(-20.6, 'celsius')).toBe('-21°');
    expect(formatTemperature(0, 'fahrenheit')).toBe('32°');
    expect(formatTemperature(null, 'celsius')).toBe('—');
    expect(formatTemperature(Number.NaN, 'fahrenheit')).toBe('—');
  });

  it('retorna o rótulo da unidade', () => {
    expect(unitLabel('celsius')).toBe('°C');
    expect(unitLabel('fahrenheit')).toBe('°F');
  });
});
