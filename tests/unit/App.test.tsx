import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App', () => {
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

  it('apresenta o mock de São Paulo sem API e converte as temperaturas pela unidade', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('textbox', { name: /buscar cidade/i }), 'São Paulo');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(screen.getByRole('status')).toHaveTextContent('Dados simulados para desenvolvimento.');
    expect(screen.getByRole('heading', { name: 'São Paulo' })).toBeInTheDocument();
    expect(screen.getByText('24°')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: '°F' }));
    expect(screen.getByText('75°')).toBeInTheDocument();
    expect(screen.getByText('81°')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
