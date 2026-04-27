// @ts-check
import 'dotenv/config'
import { defineConfig, devices } from '@playwright/test';

/** @type {{ [key: string]: { baseURL: string } }} */
const environments = {
  staging: {
    baseURL: 'https://the-internet.herokuapp.com',
  },
  production: {
    baseURL: 'https://the-internet.herokuapp.com',
  },
}

const env = process.env.TEST_ENV || 'staging'
const currentEnv = environments[env] || environments['staging']

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: currentEnv.baseURL,
    timeout: 30000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});