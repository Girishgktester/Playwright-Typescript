import { test as base } from '@playwright/test';
import RegisterPage from '@pages/RegisterPage';
import RegisterAssertions from '@pages/RegisterAssertions';
import LogininAssertion from '@pages/LoginAssertion';
import { HomePage } from '@pages/Homepage';
import HomepageAssertion from '@pages/HomepageAssertion';
import { CartPage } from '@pages/CartPage'
import CartAssertion from '@pages/CartAssertion'
import ProductAssertion from '@pages/ProductAssertion';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';
import SearchPage from '@pages/SearchPage';
import SearchAssertions from '@pages/SearchAssertions';
import { CheckoutPage } from '@pages/CheckoutPage';
import CheckoutAssertion from '@pages/CheckoutAssertion';
import BasePage from '@utils/BasePage';
import { LoginPage } from '@pages/ecomm.demo.pages/LoginPage';

type MyFixtures = {
  registerPage: RegisterPage;
  registerAssert: RegisterAssertions;
  loginAssertion: LogininAssertion;
  homePageAssertion: HomepageAssertion;
  homePage: HomePage;
  cartPage: CartPage;
  cartAssertion: CartAssertion;
  pdp: ProductDetailsPage;
  produtAssertion: ProductAssertion;
  searchPage: SearchPage;
  searchAssertion: SearchAssertions;
  checkoutPage: CheckoutPage;
  checkoutAssertion: CheckoutAssertion;
  basePage : BasePage;
  loginPageE: LoginPage;

};

export const test = base.extend<MyFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  registerAssert: async ({ page, registerPage }, use) => {
    await use(new RegisterAssertions(page, registerPage));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPageE: async ({ page }, use) => {
    await use(new LoginPage(page));
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

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));

  },

  searchAssertion: async ({ page, searchPage }, use) => {
    await use(new SearchAssertions(page, searchPage));

  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));

  },

  checkoutAssertion: async ({ page, checkoutPage }, use) => {
    await use(new CheckoutAssertion(page, checkoutPage));

  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));

  },

  

});