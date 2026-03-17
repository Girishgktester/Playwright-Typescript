import { Page, Locator, expect } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';

import BasePage from '@utils/BasePage';

export default class LoginPage extends BasePage {

    navbar: NavbarComponent
    // readonly page: Page;

    // LOCATORS   
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly productName: Locator;


    constructor(page: Page) {
        super(page);

        // this.page = page;
        this.navbar = new NavbarComponent(page)
        this.emailInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.productName = page.getByText('Sauce Labs Backpack');
    }

    async gotoUrl() {
        await this.goto('https://www.saucedemo.com');  // ✅ using BasePage method
    }

    // METHODS
    async login(email: string, password: string) {

        // await this.fill(this.emailInput, email);
        await this.emailInput.fill(email);

        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // ASSERTIONS

    async verifyUserLoggedIn() {
        await expect(this.productName).toBeVisible()
    }

    async navigateToPDP() {
        await this.navbar.naviagteToPDP();
    }
};

