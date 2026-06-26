import { expect, test } from "@playwright/test";

const email = process.env.E2E_EMAIL;
const password = process.env.E2E_PASSWORD;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const hasSupabaseConfig =
  Boolean(supabaseUrl && supabasePublishableKey) &&
  supabaseUrl !== "https://example.supabase.co" &&
  supabasePublishableKey !== "sb_publishable_test_key";
const escapedEmail = escapeRegExp(email ?? "");

test.skip(
  !email || !password || !hasSupabaseConfig,
  "Set E2E_EMAIL, E2E_PASSWORD, NEXT_PUBLIC_SUPABASE_URL, and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to run authenticated Supabase smoke tests.",
);

test.setTimeout(60_000);

test("authenticated user sees the correct app navigation and can generate", async ({
  page,
}) => {
  const topic = `Authenticated QA pass ${Date.now()}`;

  await page.goto("/login");
  await page.getByLabel("Email", { exact: true }).fill(email ?? "");
  await page.getByLabel("Password", { exact: true }).fill(password ?? "");
  await page.getByRole("button", { name: /^sign in$/i }).click();

  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 });
  await expect(page.getByText(email ?? "").first()).toBeVisible();
  const userMenuButton = page.getByRole("button", {
    name: new RegExp(escapedEmail, "i"),
  });
  await expect(userMenuButton).toBeVisible();

  const topicInput = page.getByRole("textbox", { name: /email topic/i });
  const generateButton = page.getByRole("button", { name: /^generate email$/i });
  await topicInput.pressSequentially(topic);
  await expect(page.getByText(`${topic.length} / 500`)).toBeVisible();
  await expect(generateButton).toBeEnabled();
  await generateButton.click();

  await expect(page.getByText("Result preview")).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    page.getByRole("button", { name: /copy generated email/i }),
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    page
      .locator("pre")
      .filter({ hasText: new RegExp(escapeRegExp(topic), "i") }),
  ).toBeVisible();

  await page.goto("/pricing");
  const pricingHeader = page.getByRole("banner");
  await expect(
    pricingHeader.getByRole("link", { name: /^dashboard$/i }),
  ).toBeVisible();
  await expect(
    pricingHeader.getByRole("link", { name: /^sign in$/i }),
  ).toHaveCount(0);
  await expect(
    pricingHeader.getByRole("link", { name: /^get started$/i }),
  ).toHaveCount(0);

  await page.goto("/profile");
  await expect(page.getByText(email ?? "").first()).toBeVisible();
  await expect(page.getByText("Saved drafts")).toBeVisible();

  await userMenuButton.click();
  await page.getByRole("menuitem", { name: /sign out/i }).click();
  await expect(page).toHaveURL(/\/login$/, { timeout: 20_000 });

  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
