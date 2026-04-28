import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Load env file based on the TEST_ENV variable.
 * Run: TEST_ENV=dev npx playwright test // window command : $env:TEST_ENV = "stg" ;npx playwright test
 */
const ENV = process.env.TEST_ENV || 'prod';
dotenv.config({
  path: path.resolve(__dirname, `.env.${ENV}`),
  quiet: true, // Suppress warnings if the .env file is missing
});

// 2. DEBUG CHECK 
console.log('🔥 ENV LOADED:', {
  TEST_ENV: ENV,
  API_URL: process.env.API_URL,
});

export default defineConfig({
  testDir: './tests',
  timeout: Number(process.env.TIMEOUT) || 30000,
  retries: Number(process.env.RETRY_COUNT) || 2,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.BASE_URL,
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.spec\.ts/,
    },
    {
      name: 'e2e-tests',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /.*\.setup\.spec\.ts/,
      dependencies: ['setup'],
    },
  ],
});
