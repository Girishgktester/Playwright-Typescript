import { test } from '@fixtures/loggedInFixture';
import { testData } from '@test-data/users';

test('Valid login', async ({ loginPage, loginAssertion}) => {
  await loginPage.gotoUrl();
  await loginAssertion.verifyUserLoggedIn();
  await loginAssertion.verifySessionCreated()
})

test('Login with invalid credentials', async ({ loginPage, loginAssertion }) => {
  await loginPage.gotoUrl();
  await loginAssertion.verifyInvalidCredentialsErrorMessage();
})

test('Logout flow', async ({ loginPage, loginAssertion }) => {
  await loginPage.gotoUrl();
  await loginPage.clickOnLogoutButton();
  await loginAssertion.verifyUserLoggedout();
  await loginAssertion.verifySessionCleared();
})