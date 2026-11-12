import { useEffect, useRef } from 'react';
import { formatTemperature, unitLabel } from '../lib/temperature';
import { getWeatherIcon, getWeatherLabel } from '../lib/weatherCodes';
import type { City, CurrentWeather as CurrentWeatherType, Unit } from '../types/weather';

interface CurrentWeatherProps {
  city: City;
  current: CurrentWeatherType;
  unit: Unit;
}

interface MetricProps {
  icon: string;
  label: string;
  value: string;
}

function Metric({ icon, label, value }: MetricProps) {
  return (
    <dl className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-xl">
          {icon}
        </span>
        <div className="min-w-0">
          <dt className="text-xs text-white/70">{label}</dt>
          <dd className="break-words font-semibold">{value}</dd>
        </div>
      </div>
    </dl>
  );
}

function formatMetric(value: number | null, suffix: string, decimals = 0): string {
  if (value === null || !Number.isFinite(value)) return '—';
  return `${decimals === 0 ? Math.round(value) : value.toFixed(decimals)}${suffix}`;
}

/** Seção "hero" com as condições atuais da cidade selecionada. */
export default function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  const cityHeadingRef = useRef<HTMLHeadingElement>(null);
  const location = [city.admin1, city.country].filter(Boolean).join(', ');

  useEffect(() => {
    cityHeadingRef.current?.focus();
  }, []);

  return (
    <section
      aria-label="Clima atual"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-glass md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h2
            ref={cityHeadingRef}
            tabIndex={-1}
            className="break-words text-2xl font-bold outline-none focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-accent-400 md:text-3xl"
          >
            {city.name}
          </h2>
          {location && <p className="text-white/70">{location}</p>}

          <div className="mt-6 flex items-center gap-4">
            <span aria-hidden="true" className="text-6xl">
              {getWeatherIcon(current.weatherCode)}
            </span>
            <div className="flex items-start">
              <span className="text-6xl font-light md:text-7xl">
                {formatTemperature(current.temperature, unit)}
              </span>
              <span className="mt-2 text-xl font-medium text-white/70 md:mt-3">
                {unitLabel(unit).slice(1)}
              </span>
            </div>
          </div>
          <p className="mt-2 text-white/70">{getWeatherLabel(current.weatherCode)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Metric icon="💧" label="Umidade" value={formatMetric(current.humidity, '%')} />
          <Metric icon="💨" label="Vento" value={formatMetric(current.windSpeed, ' km/h')} />
          <Metric
            icon="🌧️"
            label="Precipitação"
            value={formatMetric(current.precipitation, ' mm', 1)}
          />
          <Metric icon="📊" label="Pressão" value={formatMetric(current.pressure, ' hPa')} />
        </div>
      </div>
    </section>
  );
}
