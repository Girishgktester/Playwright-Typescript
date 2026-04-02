import { test } from '@fixtures/loggedInFixture';
import { testData } from '@test-data/users';


test.beforeEach(async ({ }, testInfo) => {
    console.log(testInfo.file);
});
test('Valid login', { tag: ['@smoke'] }, async ({ loginPage, loginAssertion }) => {
    await loginPage.gotourl()
    await loginAssertion.verifyUserLoggedIn();
    await loginAssertion.verifySessionCreated()
})

test.describe('Guest cart flow', { tag: ['@smoke', '@regression'] }, () => {
    test.use({ storageState: undefined });
    test('Login with invalid credentials', async ({ loginPage, loginAssertion }) => {
        await loginPage.gotourl()
        await loginPage.navbar.navigateToLoginPage();
        await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
        await loginAssertion.verifyInvalidCredentialsErrorMessage();
    })

});

test('Logout flow', { tag: ['@smoke', '@regression'] }, async ({ loginPage, loginAssertion }) => {
    await loginPage.gotourl()
    await loginPage.clickOnLogoutButton();
    await loginAssertion.verifyUserLoggedout();
    await loginAssertion.verifySessionCleared();
});