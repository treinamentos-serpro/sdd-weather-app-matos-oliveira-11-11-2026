import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ForecastList from '../../src/components/ForecastList';
import type { ForecastDay } from '../../src/types/weather';

const forecast: ForecastDay[] = [
  { date: '2026-11-11', min: 10, max: 20, weatherCode: 0, precipitationProbability: 10 },
  { date: '2026-11-12', min: 11, max: 21, weatherCode: 1, precipitationProbability: 20 },
  { date: '2026-11-13', min: 12, max: 22, weatherCode: 2, precipitationProbability: 30 },
  { date: '2026-11-14', min: 13, max: 23, weatherCode: 3, precipitationProbability: 40 },
  { date: '2026-11-15', min: 14, max: 24, weatherCode: 61, precipitationProbability: 50 },
];

describe('ForecastList', () => {
  it('renderiza os cinco resumos com dia, condição, temperaturas e chance de chuva', () => {
    render(<ForecastList forecast={forecast} unit="celsius" />);

    expect(screen.getByRole('region', { name: 'Previsão de 5 dias' })).toBeInTheDocument();
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(5);

    const expectedCards = [
      { day: 'Hoje', date: '11 Nov', condition: 'Céu limpo', max: '20°', min: '10°', rain: '10%' },
      {
        day: 'Amanhã',
        date: '12 Nov',
        condition: 'Predomínio de sol',
        max: '21°',
        min: '11°',
        rain: '20%',
      },
      {
        day: 'Sex',
        date: '13 Nov',
        condition: 'Parcialmente nublado',
        max: '22°',
        min: '12°',
        rain: '30%',
      },
      { day: 'Sáb', date: '14 Nov', condition: 'Nublado', max: '23°', min: '13°', rain: '40%' },
      { day: 'Dom', date: '15 Nov', condition: 'Chuva fraca', max: '24°', min: '14°', rain: '50%' },
    ];

    for (const [index, expected] of expectedCards.entries()) {
      const card = within(cards[index]);
      expect(card.getByText(expected.day)).toBeInTheDocument();
      expect(card.getByText(expected.date)).toBeInTheDocument();
      expect(card.getByRole('img', { name: expected.condition })).toBeInTheDocument();
      expect(card.getByText(expected.max)).toBeInTheDocument();
      expect(card.getByText(expected.min)).toBeInTheDocument();
      expect(card.getByText(expected.rain)).toBeInTheDocument();
      expect(card.getByRole('img', { name: 'Probabilidade de chuva' })).toBeInTheDocument();
    }
  });

  it('converte máximas e mínimas conforme a unidade recebida', () => {
    const { rerender } = render(<ForecastList forecast={forecast} unit="celsius" />);
    const renderCards = () => screen.getAllByRole('listitem').map((card) => within(card));

    expect(renderCards()[0].getByText('20°')).toBeInTheDocument();
    expect(renderCards()[0].getByText('10°')).toBeInTheDocument();

    rerender(<ForecastList forecast={forecast} unit="fahrenheit" />);

    expect(renderCards()[0].getByText('68°')).toBeInTheDocument();
    expect(renderCards()[0].getByText('50°')).toBeInTheDocument();
    expect(renderCards()[4].getByText('75°')).toBeInTheDocument();
    expect(renderCards()[4].getByText('57°')).toBeInTheDocument();
  });
});
