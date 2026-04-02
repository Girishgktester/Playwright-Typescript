import { Page, expect } from '@playwright/test';
import RegisterPage from './RegisterPage';

export default class RegisterAssertions {
  constructor(private page: Page, private registerPage: RegisterPage) {}

  async verifyGenderNotSelected() {
    await expect(this.registerPage.genderRadioMale).not.toBeChecked();
    await expect(this.registerPage.genderRadioFemale).not.toBeChecked();
  }

  async verifyMaleSelected() {
    await expect(this.registerPage.genderRadioMale).toBeChecked();
  }

  async verifyFirstNameVisible() {
    await expect(this.registerPage.firstNameInput).toBeVisible();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page.getByText('Your registration completed')).toBeVisible();
  }

  async verifyDuplicateEmailErrorMessage(){
       await expect(this.registerPage.registerErrorMsg).toBeVisible();
  }

}