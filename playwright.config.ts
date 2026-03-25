import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.ts',

  testDir: './tests',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,

    launchOptions: {
      slowMo: process.env.CI ? 0 : 100,
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