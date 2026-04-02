import { test } from '@fixtures/objectsFixtures';
import { testData } from '@test-data/users';

test.describe('Guest cart flow', { tag: ['@smoke'] }, () => {
    test('Register user page', { tag: ['@smoke'] }, async ({ registerPage, registerAssert, basePage }) => {
        await basePage.goto('/')
        await registerPage.navigateToRegisterUserPage();
        await registerPage.navigateToRegisterPage()
        await registerAssert.verifyGenderNotSelected();
        await registerPage.selectGenderMale();
        await registerAssert.verifyMaleSelected();
        await registerPage.fillRegistrationForm(testData.registerUser);
    });

    test('Register wiith exisiting email', { tag: ['@smoke'] }, async ({ registerPage, registerAssert, basePage }) => {
        await basePage.goto('/')
        await registerPage.navigateToRegisterUserPage();
        await registerPage.navigateToRegisterPage()
        const email = await registerPage.fillRegistrationForm({ ...testData.registerUser, email: undefined });
        // await registerPage.clickRegister();
        // await registerAssert.verifyRegistrationSuccess();
        // await registerPage.fillRegistrationForm({ ...testData.registerUser, email })
        //i know whats missing here
        // await registerPage.clickRegister();
        // await registerAssert.verifyDuplicateEmailErrorMessage();
    })
});
