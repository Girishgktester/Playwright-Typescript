import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {

  constructor(protected page: Page) {

  }

  async goto(url: string) {
    console.log(`Navigating to URL: ${url}`);
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    console.log(`Clicking on locator: ${locator}`);
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    console.log(`Filling value: ${value}`);

    await locator.fill(value);
  }

  async waitForVisible(locator: Locator) {
    console.log(`Waiting for visibility of locator: ${locator}`);
    await expect(locator).toBeVisible();

  }

  async getText(locator: Locator) {
    console.log(`Getting text for locator: ${locator}`);
    return await locator.textContent();
  }
}