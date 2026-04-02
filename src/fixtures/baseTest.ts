import { test as base } from '@playwright/test';

export const test = base;

// test.beforeEach(async ({ page }, testInfo) => {
//   const baseURL = testInfo.project.use.baseURL!;

//   console.log(`Worker ${testInfo.workerIndex} using baseURL: ${baseURL}`);

//   // optional: only if you REALLY want global navigation
//   await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
// });

test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot({ fullPage: true });

  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
});