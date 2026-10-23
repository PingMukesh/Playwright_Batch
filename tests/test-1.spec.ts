import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="password"]').press('Tab');
  await page.locator('[data-test="login-button"]').press('Enter');
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="error"]').click();
  await page.locator('[data-test="cancel"]').click();
});