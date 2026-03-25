// import { test } from '@fixtures/loggedInFixture';
// import { testData } from '@test-data/users';

// import {  } from '@fixtures/objectsFixtures';



// test('Valid login',{tag : ['@smoke']}, async ({ loginPage, loginAssertion , basePage }) => {
//       await basePage.goto( process.env.BASE_URL)
//   await loginAssertion.verifyUserLoggedIn();
//   await loginAssertion.verifySessionCreated()
// })

// test.describe('Guest cart flow', { tag: ['@smoke', '@regression'] }, () => {
//   test.use({ storageState: undefined });
//   test('Login with invalid credentials', async ({ loginPage, loginAssertion }) => {
//           await basePage.goto( process.env.BASE_URL)

//     await loginPage.navbar.navigateToLoginPage();
//     await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
//     await loginAssertion.verifyInvalidCredentialsErrorMessage();
//   })

// });

// test('Logout flow', { tag: ['@smoke', '@regression'] }, async ({ loginPage, loginAssertion }) => {
//         await basePage.goto( process.env.BASE_URL)

//   await loginPage.clickOnLogoutButton();
//   await loginAssertion.verifyUserLoggedout();
//   await loginAssertion.verifySessionCleared();
// });