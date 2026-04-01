import { defineConfig, devices } from '@playwright/test';
import { ENV } from 'config/env';
import * as dotenv from 'dotenv';

const env = process.env.ENV;


// 🔥 Load correct env file
dotenv.config({
  path: `.env.${process.env.TEST_ENV || 'dev'}`
});

export default defineConfig({
  globalSetup: env === 'dev' ? './global-setup.ts' : undefined,

  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['blob'],
    ['html']
    // ['./custom-reporter.ts']
  ],


  use: {

    baseURL: process.env.TEST_ENV === 'stage'
      ? 'http://localhost:3000'
      : process.env.BASE_URL,

    // baseURL: process.env.BASE_URL,

    launchOptions: {
      slowMo: process.env.CI ? 0 : 1000,
    },

    trace: 'on-first-retry',
    headless: !!process.env.CI,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],


  webServer: env === 'stage'
    ? {
      command: 'npm start', // NOT start:stage unless it really exists
      url: 'http://localhost:3000',
      timeout: 120000,

      reuseExistingServer: !process.env.CI,
    }
    : undefined,
});

