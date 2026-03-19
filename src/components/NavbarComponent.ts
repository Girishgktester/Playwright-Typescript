import { Page } from '@playwright/test';

export default class NavbarComponent {


  private loginBtn = this.page.locator('.ico-login')
  private registerBtn = this.page.getByRole('button', { name: 'Register' }).first();

  constructor(private page: Page) { }

  async navigateToLoginPage() {
    await this.loginBtn.click();
  }

  async naviagetToRegisterPage() {
    await this.registerBtn.click();
  }


}