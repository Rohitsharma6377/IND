// @ts-check
import { test, expect } from '@playwright/test';

test('home page renders headline and links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Welcome to INDJS', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: /Learn More/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Test API/i })).toBeVisible();
});
