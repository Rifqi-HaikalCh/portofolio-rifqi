import { defineConfig, devices } from '@playwright/test';

/*
  End-to-end + accessibility suite (DesignRules.md §15 "E2E + a11y").
  Runs against the production build: `npm run build && npm run test:e2e`.
  Locally it uses the installed Chrome; CI uses Playwright's Chromium.
*/

const PORT = Number(process.env.E2E_PORT ?? 3100);
const channel = process.env.CI ? undefined : 'chrome';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  // Locally every test walks a long page against one `next start`; past three workers the
  // server, not the page, becomes the bottleneck and loads time out (v3.4).
  workers: process.env.CI ? undefined : 3,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'desktop-light',
      testIgnore: /fallback\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1440, height: 900 }, colorScheme: 'light' },
    },
    {
      name: 'desktop-dark',
      testIgnore: /fallback\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1440, height: 900 }, colorScheme: 'dark' },
    },
    {
      name: 'mobile-light',
      testIgnore: /fallback\.spec\.ts/,
      use: { ...devices['Pixel 7'], channel, viewport: { width: 390, height: 844 }, colorScheme: 'light' },
    },
    {
      name: 'mobile-dark',
      testIgnore: /fallback\.spec\.ts/,
      use: { ...devices['Pixel 7'], channel, viewport: { width: 390, height: 844 }, colorScheme: 'dark' },
    },
    {
      // Reduced motion with WebGL switched off: the poster must hold the stage.
      name: 'fallback',
      testMatch: /fallback\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        channel,
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
        launchOptions: { args: ['--disable-webgl', '--disable-3d-apis'] },
      },
    },
  ],
});
