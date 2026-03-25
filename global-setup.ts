import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
import LoginPage from '@pages/LoginPage';

dotenv.config({ path: './.env.dev' });

export default async function globalSetup() {

  const browser = await chromium.launch({ slowMo: 300, });
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);


  await page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded', timeout: 60000, });


  await loginPage.navbar.navigateToLoginPage();
  await loginPage.login(process.env.USER!, process.env.PASSWORD!);

  await context.storageState({ path: 'storageState.json' });

  await browser.close();
}