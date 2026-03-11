import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3300',
    headless: true,
    // 各テストでクリーンなコンテキストを使用
    storageState: undefined,
  },
  webServer: {
    command: 'pnpm dev',
    port: 3300,
    reuseExistingServer: true,
    timeout: 15_000,
  },
});
