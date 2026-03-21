import { Locator, Page } from '@playwright/test';

export default class NavbarComponent {


  private loginBtn = this.page.locator('.ico-login')
  private registerBtn = this.page.getByRole('button', { name: 'Register' }).first();
  private booksTab = this.page.getByRole('link', { name: 'Books' })
  private computersTab = this.page.getByRole('link', { name: 'Computers' }).first();
  private electronicsTabS = this.page.getByRole('link', { name: 'Electronics' })
  private ApparelsTab = this.page.getByRole('link', { name: 'Apparel & Shoes' })
  private digitialDownloadsTab = this.page.getByRole('link', { name: 'Digital downloads' })
  private jewelryTab = this.page.getByRole('link', { name: 'Jewelry' })
  private gitCardsTab = this.page.getByRole('link', { name: 'Gift Cards' })


  constructor(private page: Page) { }

  async navigateToLoginPage() {
    await this.loginBtn.click();
  }

  async naviagetToRegisterPage() {
    await this.registerBtn.click();
  }

  async hoverOnMenu(menuName: string) {
    const tab = this.page.locator('.top-menu').getByRole('link', { name: menuName })

    await tab.waitFor({ state: 'visible' });
    await tab.hover();
  }

  async getHomeTab() {
    return this.computersTab;
  }

  async getElectronic() {
    return this.electronicsTabS;
  }


}