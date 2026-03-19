import { Page, Locator, test } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';
import BasePage from '@utils/BasePage';

export default class RegisterPage extends BasePage {
    navbar: NavbarComponent;

    readonly genderRadioMale: Locator;
    readonly genderRadioFemale: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerBtnRegisterPage: Locator;
    readonly registerErrorMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.navbar = new NavbarComponent(page);

        this.genderRadioMale = page.locator('.gender').getByRole('radio', { name: 'Male' }).first();
        this.genderRadioFemale = page.locator('.gender').getByRole('radio', { name: 'Female' }).first();
        this.firstNameInput = page.getByLabel('First name:');
        this.lastNameInput = page.getByLabel('Last name:');
        this.emailInput = page.getByLabel('Email:');
        this.passwordInput = page.getByLabel('Password:').first();
        this.confirmPasswordInput = page.getByLabel('Confirm password:').first();
        this.registerBtnRegisterPage = page.locator('.registration-page').getByRole('button', { name: 'Register' });
        this.registerErrorMsg = page.getByText('The specified email already exists');
    }

    async navigate() {
        await this.goto('https://demowebshop.tricentis.com/');
    }

    async navigateToRegisterUserPage() {
        await this.navbar.navigateToLoginPage();
    }

    async selectGenderMale() {
        await this.genderRadioMale.check();
    }

    async fillRegistrationForm(user) {
        await this.fill(this.firstNameInput, user.fName);
        await this.fill(this.lastNameInput, user.lName);
        const email = user.email ?? `user_${Date.now()}@test.com`;
        await test.step(`Generated email: ${email}`, async () => { });
        await this.fill(this.emailInput, email);
        await this.fill(this.passwordInput, user.password);
        await this.fill(this.confirmPasswordInput, user.confrimPwd);
        return email;
    }

    async clickRegister() {
        await this.click(this.registerBtnRegisterPage);
    }

    async navigateToRegisterPage() {
        await this.navbar.naviagetToRegisterPage();
    }
}