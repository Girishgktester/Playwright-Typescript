import { Page, Locator, expect } from '@playwright/test';

export default class NavbarComponent {

  private productName = this.page.getByText('Sauce Labs Backpack').first();
  private profileMenu = this.page.locator('#profile')

  constructor(private page: Page) {}

  async naviagteToPDP() {
    await this.productName.click()
  }

  async openProfile() {
    await this.profileMenu.click()
  }

}