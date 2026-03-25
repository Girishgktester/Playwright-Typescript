import { defineConfig, devices } from '@playwright/test';
// import { ENV } from './config/env';

export default defineConfig({
  globalSetup: './global-setup.ts',

  testDir: './tests',
  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  grep: /@smoke/,

  use: {
    // baseURL: ENV.baseURL,
    // storageState: 'storageState.json',

    launchOptions: {
      slowMo: 100,
    },

    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },

  projects: [
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});