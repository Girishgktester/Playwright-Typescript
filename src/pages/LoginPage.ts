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
    readonly accountsBtn : Locator;


    constructor(page: Page) {
        super(page);

        this.navbar = new NavbarComponent(page)
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.loginButton = page.getByRole('button', {name : 'Log in'});
        this.accountsBtn = page.getByRole('link', {name: 'account'})
    }

    async gotoUrl() {
        await this.goto('https://demowebshop.tricentis.com/');  // ✅ using BasePage method
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

    async naviagteToLoginPage(){

        await this.navbar.navigateToLoginPage();

    }

};

