import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import EmptyState from '../../src/components/states/EmptyState';
import ErrorState from '../../src/components/states/ErrorState';
import LoadingState from '../../src/components/states/LoadingState';

describe('componentes de estado', () => {
  it('anuncia o carregamento por status com nome e texto', () => {
    render(<LoadingState />);

    expect(screen.getByRole('status', { name: 'Carregando o clima' })).toHaveTextContent(
      'Carregando o clima',
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('apresenta o título e a dica do estado vazio sem sinalizar erro', () => {
    render(
      <EmptyState title="Nenhuma cidade encontrada" hint="Confira a grafia e tente novamente." />,
    );

    expect(screen.getByRole('heading', { name: 'Nenhuma cidade encontrada' })).toBeInTheDocument();
    expect(screen.getByText('Confira a grafia e tente novamente.')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('não executa texto com marcação e permite tentar novamente pelo teclado', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const maliciousMessage = '<img src=x onerror=alert(1)>';
    const { container, rerender } = render(
      <ErrorState message={maliciousMessage} onRetry={onRetry} />,
    );
    const retryButton = screen.getByRole('button', { name: 'Tentar novamente' });

    expect(screen.getByRole('alert')).toHaveTextContent(maliciousMessage);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(onRetry).not.toHaveBeenCalled();

    await user.tab();
    expect(retryButton).toHaveFocus();
    rerender(<ErrorState message="Falha ao carregar o clima." onRetry={onRetry} />);
    expect(retryButton).toHaveFocus();
    await user.keyboard('{Enter}');

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
