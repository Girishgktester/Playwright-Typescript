import { Page, Locator, expect } from '@playwright/test';

export default class NavbarComponent {

  private cartIcon = this.page.locator('#cart')
  private profileMenu = this.page.locator('#profile')

  constructor(private page: Page) {}

  async openCart() {
    await this.cartIcon.click()
  }

  async openProfile() {
    await this.profileMenu.click()
  }

}