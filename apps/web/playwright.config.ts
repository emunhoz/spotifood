import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

// Screenshots must be deterministic: no motion, fixed timezone (the clock is fixed per test).
// Baselines are rendered on CI's Linux runner; regenerate them with the "E2E" workflow's update input.
export default defineConfig({
  testDir: './e2e',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 }
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    reducedMotion: 'reduce',
    timezoneId: 'Europe/Madrid',
    locale: 'en-US'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ],
  webServer: {
    command: `bunx vite preview --host 127.0.0.1 --port ${PORT} --strictPort`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI
  }
})
