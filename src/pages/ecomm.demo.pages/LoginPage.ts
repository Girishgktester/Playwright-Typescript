import { expect, Page } from '@playwright/test';

export class LoginPage {


    readonly emailInput;
    readonly passowrdInput;
    readonly loginButton;

    constructor(private page: Page) {

        this.emailInput = page.getByPlaceholder('Email');
        this.passowrdInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });

    }

    async verifyLogginScreen() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passowrdInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async verifyLoginToApplication(username?: string, password?: string) {
        await this.emailInput.fill(username || process.env.USER!);
        await this.passowrdInput.fill(password || process.env.PASSWORD!);
        await this.loginButton.click();
    }



}