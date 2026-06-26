import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

loadPlaywrightEnv();

const localChrome = process.env.CI
  ? {}
  : {
      channel: "chrome",
    };

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...localChrome,
      },
    },
  ],
});

function loadPlaywrightEnv() {
  const envFiles = [".env.development.local", ".env.local", ".env.development", ".env"];

  for (const file of envFiles) {
    const path = resolve(process.cwd(), file);

    if (existsSync(path)) {
      process.loadEnvFile(path);
    }
  }
}
