import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import { useWeather } from './hooks/useWeather';
import { mockWeatherData } from './mock/weather';
import type { Unit, WeatherData } from './types/weather';

/**
 * WeatherView — aplicação completa de previsão do tempo.
 *
 * Construída ao longo do treinamento de Spec-Driven Development com GitHub
 * Copilot, do briefing à entrega.
 */
export default function App() {
  const { status, data, error, query, search, retry } = useWeather();
  const [unit, setUnit] = useState<Unit>('celsius');
  const [mockData, setMockData] = useState<WeatherData | null>(null);
  const displayedStatus = mockData ? 'success' : status;
  const displayedData = mockData ?? data;

  function handleSearch(cityName: string) {
    if (cityName.trim().toLowerCase() === mockWeatherData.city.name.toLowerCase()) {
      setMockData(mockWeatherData);
      return;
    }

    setMockData(null);
    void search(cityName);
  }

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-2xl text-sun">
              ☀️
            </span>
            <h1 className="text-lg font-bold">WeatherView</h1>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
            <SearchBar onSearch={handleSearch} disabled={status === 'loading' && !mockData} />
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        {displayedStatus === 'idle' && (
          <EmptyState
            title="Busque uma cidade para começar"
            hint="Ex.: Seattle, Lisboa, São Paulo…"
          />
        )}

        {displayedStatus === 'loading' && <LoadingState />}

        {displayedStatus === 'empty' && (
          <EmptyState
            title={`Nenhuma cidade encontrada para "${query}"`}
            hint="Verifique a grafia e tente novamente."
          />
        )}

        {displayedStatus === 'error' && error && <ErrorState message={error} onRetry={retry} />}

        {displayedStatus === 'success' && displayedData && (
          <>
            {mockData && (
              <p role="status" className="text-center text-sm text-white/60">
                Dados simulados para desenvolvimento.
              </p>
            )}
            <CurrentWeather city={displayedData.city} current={displayedData.current} unit={unit} />
            <ForecastList forecast={displayedData.forecast} unit={unit} />
          </>
        )}
      </main>

      <footer className="py-8 text-center text-sm text-white/60">
        Dados por{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="text-accent-400 hover:underline"
        >
          Open-Meteo
        </a>
      </footer>
    </div>
  );
}
