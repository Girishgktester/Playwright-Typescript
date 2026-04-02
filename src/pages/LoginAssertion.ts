import { Page, expect } from '@playwright/test';
import RegisterPage from './LoginPage';
import LoginPage from './LoginPage';

export default class LogininAssertion {
    constructor(private page: Page, private loginpage: LoginPage) { }

    async verifyUserLoggedIn() {
        await expect(this.loginpage.accountsBtn).toBeVisible();
    }

    async verifyInvalidCredentialsErrorMessage() {
        await expect(this.loginpage.invalidUserErrorMsg).toBeVisible();
    }

    async verifyUserLoggedout() {
        await expect(this.loginpage.loginBtn).toBeVisible();
    }

    async verifySessionCreated() {
        const cookies = await this.page.context().cookies();
        expect(cookies.find(c => c.name === 'NOPCOMMERCE.AUTH')).toBeTruthy();
    }

    async verifySessionCleared() {
        const cookies = await this.page.context().cookies();
        expect(cookies.find(c => c.name === 'NOPCOMMERCE.AUTH')).toBeFalsy();
    }

}
