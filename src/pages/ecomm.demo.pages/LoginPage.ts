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

    async verifyLoginToApplication() {
        await this.emailInput.fill(process.env.USER!);
        await this.passowrdInput.fill(process.env.PASSWORD!);
        await this.loginButton.click();
    }



}