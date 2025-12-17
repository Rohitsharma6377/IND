// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000",
    headless: true,
    trace: "off",
  },
  webServer: process.env.E2E_NO_SERVER
    ? undefined
    : {
        command: "indjs start --port 3000",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        stdout: "pipe",
        stderr: "pipe",
      },
});
