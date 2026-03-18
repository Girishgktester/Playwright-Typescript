import Registerpage from '@pages/RegisterPage'
import { test } from '@fixtures/loginFixture';
import '@fixtures/baseTest';
import { testData } from '@test-data/users';
import RegisterAssertions from '@pages/RegisterAssertions';


test('Register user page', async ({ page }) => {

  const registerpage = new Registerpage(page);
  const registerAssert = new RegisterAssertions(page, registerpage);
  await registerpage.navigate();
  await registerpage.navigateToRegisterUserPage();
  await registerpage.navigateToRegisterPage()
  await registerAssert.verifyGenderNotSelected();
  await registerpage.selectGenderMale();
  await registerAssert.verifyMaleSelected();
  await registerpage.fillRegistrationForm(testData.registerUser);
  // await registerpage.clickRegister();
  // await registerAssert.verifyRegistrationSuccess();
});


