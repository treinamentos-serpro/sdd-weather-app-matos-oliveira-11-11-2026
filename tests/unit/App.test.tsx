import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';
import { getWeather, searchCities, WeatherServiceError } from '../../src/services/weatherService';
import { mockWeatherData } from '../../src/mock/weather';

vi.mock('../../src/services/weatherService', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../src/services/weatherService')>()),
  searchCities: vi.fn(),
  getWeather: vi.fn(),
}));

async function searchFor(name: string) {
  const user = userEvent.setup();
  await user.type(screen.getByRole('textbox', { name: /buscar cidade/i }), name);
  await user.click(screen.getByRole('button', { name: 'Buscar' }));
  return user;
}

describe('App', () => {
  beforeEach(() => {
    vi.mocked(searchCities).mockReset();
    vi.mocked(getWeather).mockReset();
  });

  it('renderiza a marca e o estado inicial vazio', () => {
    render(<App />);
    expect(screen.getByText('WeatherView')).toBeInTheDocument();
    expect(screen.getByText(/busque uma cidade para começar/i)).toBeInTheDocument();
  });

  it('mostra a barra de busca e o alternador de unidade', () => {
    render(<App />);
    expect(screen.getByLabelText(/buscar cidade/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /unidade de temperatura/i })).toBeInTheDocument();
  });

  it('mostra loading, depois o clima, e converte as temperaturas pela unidade', async () => {
    vi.mocked(searchCities).mockResolvedValue([mockWeatherData.city]);
    vi.mocked(getWeather).mockResolvedValue(mockWeatherData);
    render(<App />);

    const user = await searchFor('São Paulo');

    expect(await screen.findByRole('heading', { name: 'São Paulo' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByText('24°')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '°F' }));
    expect(screen.getByText('75°')).toBeInTheDocument();
    expect(getWeather).toHaveBeenCalledTimes(1);
  });

  it('mostra o estado vazio quando nenhuma cidade é encontrada', async () => {
    vi.mocked(searchCities).mockResolvedValue([]);
    render(<App />);

    await searchFor('xyz');

    expect(await screen.findByText(/nenhuma cidade encontrada para "xyz"/i)).toBeInTheDocument();
    expect(getWeather).not.toHaveBeenCalled();
  });

  it('mostra o erro e chama retry ao tentar novamente', async () => {
    vi.mocked(searchCities).mockResolvedValue([mockWeatherData.city]);
    vi.mocked(getWeather).mockRejectedValueOnce(new WeatherServiceError('Falha de rede.'));
    render(<App />);

    const user = await searchFor('São Paulo');
    expect(await screen.findByRole('alert')).toHaveTextContent('Falha de rede.');

    vi.mocked(getWeather).mockResolvedValue(mockWeatherData);
    await user.click(screen.getByRole('button', { name: /tentar novamente/i }));

    expect(await screen.findByRole('heading', { name: 'São Paulo' })).toBeInTheDocument();
    expect(getWeather).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
