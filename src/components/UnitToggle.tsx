import { type KeyboardEvent, useRef } from 'react';
import type { Unit } from '../types/weather';

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

/** Alternador de unidade Celsius/Fahrenheit, acessível por teclado. */
export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const units: Unit[] = ['celsius', 'fahrenheit'];
    const currentIndex = units.indexOf(unit);
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % units.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + units.length) % units.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = units.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextUnit = units[nextIndex];
    onChange(nextUnit);
    groupRef.current?.querySelector<HTMLButtonElement>(`[data-unit="${nextUnit}"]`)?.focus();
  }

  return (
    <div
      ref={groupRef}
      role="group"
      aria-label="Unidade de temperatura"
      className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-md"
    >
      <button
        type="button"
        aria-pressed={unit === 'celsius'}
        tabIndex={unit === 'celsius' ? 0 : -1}
        data-unit="celsius"
        onKeyDown={handleKeyDown}
        onClick={() => onChange('celsius')}
        className={`rounded-md px-3 py-1 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 ${
          unit === 'celsius' ? 'bg-accent-600 text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        °C
      </button>
      <button
        type="button"
        aria-pressed={unit === 'fahrenheit'}
        tabIndex={unit === 'fahrenheit' ? 0 : -1}
        data-unit="fahrenheit"
        onKeyDown={handleKeyDown}
        onClick={() => onChange('fahrenheit')}
        className={`rounded-md px-3 py-1 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 ${
          unit === 'fahrenheit' ? 'bg-accent-600 text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        °F
      </button>
    </div>
  );
}
