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

  //commented these 2 methods dont want to register user eveyrtime and bomb website
  // await registerpage.clickRegister();
  // await registerAssert.verifyRegistrationSuccess();
});


test('Register wiith exisiting email', async ({ page }) => {
  const registerpage = new Registerpage(page);
  const registerAssert = new RegisterAssertions(page, registerpage);
  await registerpage.navigate();
  await registerpage.navigateToRegisterUserPage();
  await registerpage.navigateToRegisterPage()
  const email = await registerpage.fillRegistrationForm({ ...testData.registerUser,email: undefined});
  await registerpage.clickRegister();
  await registerAssert.verifyRegistrationSuccess();
  await registerpage.fillRegistrationForm({...testData.registerUser,email})
  //i know
  await registerpage.clickRegister();
  await registerAssert.verifyDuplicateEmailErrorMessage();
})


