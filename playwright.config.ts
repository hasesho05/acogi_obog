import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  // dev サーバ起動（既存あれば reuse）
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { 
      name: 'desktop-chrome', 
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      } 
    },
    { 
      name: 'iphone-ig',      
      use: { 
        ...devices['iPhone 14'],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.32.100 (iPhone14,5; iOS 17_6; ja_JP; scale=2.00)'
      } 
    },
    { 
      name: 'pixel-ig',       
      use: { 
        ...devices['Pixel 7'],
        userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Instagram 350.0.0.32.100'
      } 
    },
  ],
  outputDir: './tmp/playwright-results',
  reporter: [
    ['html', { outputFolder: './tmp/playwright-report' }],
    ['list']
  ],
});