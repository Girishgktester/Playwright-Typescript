import { test, Page, Locator, expect } from '@playwright/test';

export default class BasePage {

  constructor(protected page: Page) {

  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    console.log(`Clicking on locator: ${locator}`);
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    console.log(`Filling value: ${value}`);
    await test.step(`Filling value: ${value}`, async () => {
      await locator.fill(value);
    });
  }


  async isDisplayed(locator: Locator, text: string) {
    await test.step(`${text} : Locator is displayed:`, async () => {
      await expect(locator).toBeVisible({ timeout: 5000 });
    });
  }

  async getText(locator: Locator) {
    console.log(`Getting text for locator: ${locator}`);
    return await locator.textContent();
  }

}