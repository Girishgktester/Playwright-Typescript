import { chromium } from '@playwright/test';
import LoginPage from '@pages/LoginPage';
import { testData } from '@test-data/users';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.gotoUrl();
  await loginPage.navbar.navigateToLoginPage();

  await loginPage.login(testData.registerUser.email, testData.registerUser.password);

  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}