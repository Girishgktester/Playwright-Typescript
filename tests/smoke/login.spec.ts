import LoginPage from '@pages/LoginPage'
import { test } from '@fixtures/loginFixture';  // ✅ FIXED

test('Valid login', async ({ loggedInPage }) => {

  const loginPage = new LoginPage(loggedInPage);

  await loginPage.verifyUserLoggedIn();
  await loginPage.navigateToPDP();

});

const loginData = [
  { email: "standard_user", password: "secret_sauce", valid: true },
  { email: "visual_user", password: "secret_sauce", valid: false }
];


for (const data of loginData) {
  test(`Login test for ${data.valid ? 'valid' : 'invalid'} user`, async ({ basePage }) => {
     const loginPage = new LoginPage(basePage);

      await loginPage.login(data.email, data.password);

      await loginPage.verifyUserLoggedIn();
  });

};