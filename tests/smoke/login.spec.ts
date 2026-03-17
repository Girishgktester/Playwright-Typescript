import { test, expect } from '@playwright/test';
import LoginPage from '@pages/LoginPage'
import { waitForDebugger } from 'node:inspector';


test('Valid login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com/');

  await loginPage.login('standard_user', 'secret_sauce');

  await loginPage.verifyUserLoggedIn();

  await loginPage.navigateToPDP();

  await page.waitForTimeout(5000);

});