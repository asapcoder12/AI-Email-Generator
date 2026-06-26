import { expect, test } from "@playwright/test";

const publicRoutes = [
  { path: "/", text: "AI Email Generator for campaigns" },
  { path: "/pricing", text: "Choose a plan" },
  { path: "/login", text: "Welcome back" },
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

for (const viewport of viewports) {
  for (const route of publicRoutes) {
    test(`${route.path} renders on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(route.path);

      await expect(page.getByText(route.text).first()).toBeVisible();
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }
}

test("dashboard redirects unauthenticated users to login", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
});
