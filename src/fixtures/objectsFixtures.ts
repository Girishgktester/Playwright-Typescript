import { test as base } from '@playwright/test';
import RegisterPage from '@pages/RegisterPage';
import RegisterAssertions from '@pages/RegisterAssertions';
import LoginPage from '@pages/LoginPage';
import LogininAssertion from '@pages/LoginAssertion';
import { HomePage } from '@pages/Homepage';
import HomepageAssertion from '@pages/HomepageAssertion';
import { CartPage } from '@pages/CartPage'
import CartAssertion from '@pages/CartAssertion'
import ProductAssertion from '@pages/ProductAssertion';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';

type MyFixtures = {
  registerPage: RegisterPage;
  registerAssert: RegisterAssertions;
  loginPage: LoginPage;
  loginAssertion: LogininAssertion;
  homePageAssertion: HomepageAssertion;
  homePage: HomePage;
  cartPage: CartPage;
  cartAssertion: CartAssertion;
  pdp: ProductDetailsPage;
  produtAssertion: ProductAssertion;
};

export const test = base.extend<MyFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  registerAssert: async ({ page, registerPage }, use) => {
    await use(new RegisterAssertions(page, registerPage));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loginAssertion: async ({ page, loginPage }, use) => {
    await use(new LogininAssertion(page, loginPage));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  homePageAssertion: async ({ page, homePage }, use) => {
    await use(new HomepageAssertion(page, homePage));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  cartAssertion: async ({ page, cartPage }, use) => {
    await use(new CartAssertion(page, cartPage));
  },

  pdp: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  produtAssertion: async ({ page, pdp }, use) => {
    await use(new ProductAssertion(page, pdp));
  },

});