import { expect, test } from "@playwright/test";

const email = process.env.E2E_EMAIL;
const password = process.env.E2E_PASSWORD;

test.skip(
  !email || !password,
  "Set E2E_EMAIL and E2E_PASSWORD to run authenticated Supabase smoke tests.",
);

test.setTimeout(60_000);

test("authenticated user sees the correct app navigation and can generate", async ({
  page,
}) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email ?? "");
  await page.getByLabel("Password").fill(password ?? "");
  await page.getByRole("button", { name: /^sign in$/i }).click();

  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 });
  await expect(page.getByText(email ?? "").first()).toBeVisible();
  await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();

  await page
    .getByLabel(/email topic/i)
    .fill("Follow up after the authenticated QA pass");
  await page.getByRole("button", { name: /^generate$/i }).click();

  await expect(page.getByText("Generated result")).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByText(/Follow up after the authenticated QA pass/i)).toBeVisible();

  await page.goto("/pricing");
  await expect(page.getByRole("link", { name: /dashboard/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /^sign in$/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /^get started$/i })).toHaveCount(0);

  await page.goto("/profile");
  await expect(page.getByText(email ?? "").first()).toBeVisible();
  await expect(page.getByText("Saved drafts")).toBeVisible();

  await page.getByRole("button", { name: /sign out/i }).click();
  await expect(page).toHaveURL(/\/login$/, { timeout: 20_000 });

  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});
