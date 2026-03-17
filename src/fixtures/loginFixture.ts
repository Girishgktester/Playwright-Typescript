import { baseTest } from './baseFixture';
import { Page } from '@playwright/test';

type MyFixtures = {
  loggedInPage: Page;
};

export const test = baseTest.extend<MyFixtures>({
  loggedInPage: async ({ basePage }, use) => {
    await basePage.getByPlaceholder('Username').fill('standard_user');
    await basePage.getByPlaceholder('Password').fill('secret_sauce');
    await basePage.getByRole('button', { name: 'Login' }).click();

    await use(basePage);
  }
});