import { test as base } from '@playwright/test';

export const test = base;


test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL, {waitUntil: 'domcontentloaded', });
});

test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot({ fullPage: true });

  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png'
  });
});