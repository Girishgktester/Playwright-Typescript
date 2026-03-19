import { Page, expect } from '@playwright/test';
import RegisterPage from './LoginPage';
import LoginPage from './LoginPage';

export default class LogininAssertion {
    constructor(private page: Page, private loginpage: LoginPage) { }

    async verifyUserLoggedIn() {
        await expect(this.loginpage.accountsBtn).toBeVisible();
    }

}
