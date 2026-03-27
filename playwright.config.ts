import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// 🔥 Load correct env file
dotenv.config({
  path: `.env.${process.env.TEST_ENV || 'dev'}`
});

export default defineConfig({
  globalSetup: './global-setup.ts',

  testDir: './tests',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

//   reporter: [
//   ['blob']
// ],

reporter: [
  ['blob'],
  ['html'],
  ['./custom-reporter.ts']
],


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
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});