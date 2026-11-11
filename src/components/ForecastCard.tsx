import { getDayLabel, getShortDate } from '../lib/format';
import { formatTemperature, unitLabel } from '../lib/temperature';
import { getWeatherIcon, getWeatherLabel } from '../lib/weatherCodes';
import type { ForecastDay, Unit } from '../types/weather';

interface ForecastCardProps {
  day: ForecastDay;
  index: number;
  unit: Unit;
}

/** Card de um dia da previsão. */
export default function ForecastCard({ day, index, unit }: ForecastCardProps) {
  return (
    <li className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md">
      <p className="font-semibold">{getDayLabel(day.date, index)}</p>
      <p className="text-xs text-white/70">{getShortDate(day.date)}</p>
      <span
        role="img"
        aria-label={getWeatherLabel(day.weatherCode)}
        className="text-3xl"
        title={getWeatherLabel(day.weatherCode)}
      >
        {getWeatherIcon(day.weatherCode)}
      </span>
      <div
        role="group"
        aria-label={`Temperaturas máxima e mínima em ${unitLabel(unit)}`}
        className="text-sm"
      >
        <span className="font-semibold">
          <span className="sr-only">Máxima: </span>
          {formatTemperature(day.max, unit)}
        </span>{' '}
        <span className="text-white/70">
          <span className="sr-only">Mínima: </span>
          {formatTemperature(day.min, unit)}
        </span>
      </div>
      <p className="text-xs text-accent-400">
        <span role="img" aria-label="Probabilidade de chuva">
          💧
        </span>{' '}
        {day.precipitationProbability}%
      </p>
    </li>
  );
}
