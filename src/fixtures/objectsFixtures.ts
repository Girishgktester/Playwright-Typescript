import { test as base } from '@playwright/test';
import RegisterPage from '@pages/RegisterPage';
import RegisterAssertions from '@pages/RegisterAssertions';
import LoginPage from '@pages/LoginPage';
import LogininAssertion from '@pages/LoginAssertion';

type MyFixtures = {
  registerPage: RegisterPage;
  registerAssert: RegisterAssertions;
  loginPage: LoginPage;
  loginAssertion : LogininAssertion
};

export const test = base.extend<MyFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  registerAssert: async ({ page, registerPage }, use) => {
    await use(new RegisterAssertions(page, registerPage));
  },

  loginPage : async ({page},use) => {
    await use(new LoginPage(page));
  },

    loginAssertion: async ({ page, loginPage }, use) => {
    await use(new LogininAssertion(page, loginPage));
  },
});