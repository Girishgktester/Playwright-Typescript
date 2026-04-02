import { Locator, Page } from '@playwright/test';

export default class NavbarComponent {


  private loginBtn = this.page.locator('.ico-login')
  private registerBtn = this.page.getByRole('button', { name: 'Register' }).first();
  private searchBar = this.page.locator('#small-searchterms')
  private searchBtn = this.page.getByRole('button', {name : 'Search'})
  private computersTab = this.page.getByRole('link', { name: 'Computers' }).first();
  private electronicsTabS = this.page.getByRole('link', { name: 'Electronics' })


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

  async inputSearch(searchText: string) {
    await this.searchBar.fill(searchText)
    await this.searchBtn.click();
  }


}