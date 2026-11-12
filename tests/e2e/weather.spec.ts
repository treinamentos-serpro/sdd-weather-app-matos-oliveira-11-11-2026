import { expect, type Page, test } from '@playwright/test';

const geocoding = {
  results: [
    {
      id: 1,
      name: 'Seattle',
      country: 'Estados Unidos',
      admin1: 'Washington',
      latitude: 47.6,
      longitude: -122.33,
    },
  ],
};

const forecast = {
  current: {
    time: '2026-06-16T12:00',
    temperature_2m: 0,
    relative_humidity_2m: 80,
    wind_speed_10m: 10,
    surface_pressure: 1015,
    precipitation: 0,
    weather_code: 3,
  },
  daily: {
    time: ['2026-06-16', '2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20'],
    weather_code: [3, 61, 80, 1, 0],
    temperature_2m_max: [20, 19, 22, 24, 25],
    temperature_2m_min: [12, 11, 13, 14, 15],
    precipitation_probability_max: [20, 90, 70, 10, 0],
  },
};

interface MockedApiRequests {
  geocoding: string[];
  forecast: string[];
  unexpected: string[];
}

async function mockApis(page: Page): Promise<MockedApiRequests> {
  const requests: MockedApiRequests = { geocoding: [], forecast: [], unexpected: [] };

  await page.route(/https:\/\/[^/]*open-meteo\.com\//, (route) => {
    requests.unexpected.push(route.request().url());
    return route.abort();
  });
  await page.route('**/geocoding-api.open-meteo.com/**', (route) => {
    requests.geocoding.push(route.request().url());
    return route.fulfill({ json: geocoding });
  });
  await page.route('**/api.open-meteo.com/**', (route) => {
    requests.forecast.push(route.request().url());
    return route.fulfill({ json: forecast });
  });

  return requests;
}

function expectSeattleForecastRequest(url: string) {
  const params = new URL(url).searchParams;
  expect(params.get('latitude')).toBe('47.6');
  expect(params.get('longitude')).toBe('-122.33');
  expect(params.get('forecast_days')).toBe('5');
  expect(params.get('current')).toContain('temperature_2m');
  expect(params.get('daily')).toContain('temperature_2m_max');
}

test('fluxo completo: buscar → clima atual → previsão → trocar unidade', async ({ page }) => {
  const requests = await mockApis(page);
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('Seattle');
  await page.getByRole('button', { name: /buscar/i }).click();

  await expect(page.getByRole('heading', { name: 'Seattle' })).toBeVisible();
  await expect(page.getByRole('region', { name: /previsão de 5 dias/i })).toBeVisible();
  expect(requests.geocoding).toHaveLength(1);
  expect(new URL(requests.geocoding[0]).searchParams.get('name')).toBe('Seattle');
  expect(requests.forecast).toHaveLength(1);
  expectSeattleForecastRequest(requests.forecast[0]);
  expect(requests.unexpected).toEqual([]);

  const currentWeather = page.getByRole('region', { name: 'Clima atual' });
  await expect(currentWeather.getByText('0°', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '°F' }).click();
  await expect(currentWeather.getByText('32°', { exact: true })).toBeVisible();
});

test('estado vazio quando a cidade não existe', async ({ page }) => {
  let forecastRequests = 0;
  const unexpectedProviderRequests: string[] = [];
  await page.route(/https:\/\/[^/]*open-meteo\.com\//, (route) => {
    unexpectedProviderRequests.push(route.request().url());
    return route.abort();
  });
  await page.route('**/api.open-meteo.com/**', (route) => {
    forecastRequests += 1;
    return route.abort();
  });
  await page.route('**/geocoding-api.open-meteo.com/**', (route) => route.fulfill({ json: {} }));
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('xyzxyz');
  await page.getByRole('button', { name: /buscar/i }).click();

  await expect(page.getByRole('heading', { name: /nenhuma cidade encontrada/i })).toBeVisible();
  expect(forecastRequests).toBe(0);
  expect(unexpectedProviderRequests).toEqual([]);
});

test('forecast incompleto mostra erro amigável e retry recupera os dados', async ({ page }) => {
  let forecastRequests = 0;
  await page.route('**/geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({ json: geocoding }),
  );
  await page.route('**/api.open-meteo.com/**', (route) => {
    forecastRequests += 1;
    return route.fulfill({
      json: forecastRequests === 1 ? { current: forecast.current } : forecast,
    });
  });
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('Seattle');
  await page.getByRole('button', { name: /buscar/i }).click();
  await expect(page.getByRole('alert')).toContainText('Resposta de clima incompleta.');

  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByRole('region', { name: 'Previsão de 5 dias' })).toBeVisible();
  expect(forecastRequests).toBe(2);
});

test('viewport mobile renderiza o fluxo principal', async ({ page }) => {
  const requests = await mockApis(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await page.getByLabel(/buscar cidade/i).fill('Seattle');
  await page.getByRole('button', { name: /buscar/i }).click();
  await expect(page.getByRole('heading', { name: 'Seattle' })).toBeVisible();
  const currentWeather = page.getByRole('region', { name: 'Clima atual' });
  await expect(currentWeather.getByText('0°', { exact: true })).toBeVisible();
  await expect(currentWeather.getByText('Nublado', { exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Previsão de 5 dias' })).toBeVisible();
  expect(requests.forecast).toHaveLength(1);
  expectSeattleForecastRequest(requests.forecast[0]);
  expect(requests.unexpected).toEqual([]);

  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(
        () =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
          ),
        { message: `sem rolagem horizontal em ${width}px` },
      )
      .toBe(true);
  }
});
