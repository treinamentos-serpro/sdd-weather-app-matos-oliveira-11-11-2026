import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('não dispara busca com input literalmente vazio', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled();
    fireEvent.submit(screen.getByRole('search'));
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('não dispara busca quando o input contém somente espaços', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    await userEvent.type(screen.getByRole('textbox', { name: /buscar cidade/i }), '   ');
    expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled();
    fireEvent.submit(screen.getByRole('search'));
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('dispara busca com o termo digitado', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    await userEvent.type(screen.getByLabelText(/buscar cidade/i), '  Lisboa  ');
    await userEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(onSearch).toHaveBeenCalledWith('Lisboa');
  });

  it('desabilita os controles e não dispara busca enquanto disabled', async () => {
    const onSearch = vi.fn();
    const { rerender } = render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByRole('textbox', { name: /buscar cidade/i });
    await userEvent.type(input, 'Lisboa');

    rerender(<SearchBar onSearch={onSearch} disabled />);
    expect(input).toBeDisabled();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled();
    expect(screen.getByRole('search')).toHaveAttribute('aria-busy', 'true');
    fireEvent.submit(screen.getByRole('search'));
    expect(onSearch).not.toHaveBeenCalled();
  });
});
