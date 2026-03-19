import { test } from '@fixtures/objectsFixtures';
import { testData } from '@test-data/users';  

test('Valid login', async ({ loginPage, loginAssertion }) => {
  
  await loginPage.gotoUrl();
  await loginPage.naviagteToLoginPage();
  await loginPage.login(testData.registerUser.email,testData.registerUser.password);
  await loginAssertion.verifyUserLoggedIn();

})