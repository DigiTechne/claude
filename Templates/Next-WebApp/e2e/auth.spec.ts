import { test, expect } from "@playwright/test";

const testUser = {
  name: "Test User",
  email: `test-${Date.now()}@example.com`,
  password: "Password123!",
};

test.describe("Auth smoke test", () => {
  test("signup form submits and shows check-email message", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading")).toBeVisible();

    await page.goto("/signup");
    await expect(page).toHaveURL("/signup");

    await page.getByLabel("Name").fill(testUser.name);
    await page.getByLabel("Email").fill(testUser.email);
    await page.getByLabel("Password").fill(testUser.password);
    await page.getByRole("button", { name: /sign up/i }).click();

    await expect(page.getByText(/check your email/i)).toBeVisible({ timeout: 10000 });
  });

  test("login page renders", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /log in/i })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("app route redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/app");
    await expect(page).toHaveURL(/\/login/);
  });
});
