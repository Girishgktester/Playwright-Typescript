import { Page, Locator, expect } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';

export default class LoginPage {

    navbar: NavbarComponent

    readonly page: Page;

    // LOCATORS   
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly productName: Locator;


    constructor(page: Page) {
        this.page = page;
        this.navbar = new NavbarComponent(page)

        this.emailInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.productName = page.getByText('Sauce Labs Backpack');
    }

    // METHODS
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // ASSERTIONS

    async verifyUserLoggedIn() {
        await expect(this.productName).toBeVisible()
    }
}

