import { test } from '@fixtures/objectsFixtures';
import { testData } from '@test-data/users';


test('Register user page',{tag: ['@smoke']}, async ({registerPage , registerAssert }) => {
  await registerPage.navigate();
  await registerPage.navigateToRegisterUserPage();
  await registerPage.navigateToRegisterPage()
  await registerAssert.verifyGenderNotSelected();
  await registerPage.selectGenderMale();
  await registerAssert.verifyMaleSelected();
  await registerPage.fillRegistrationForm(testData.registerUser);
});

test('Register wiith exisiting email',{tag: ['@regression']}, async ({ registerPage , registerAssert }) => {
  await registerPage.navigate();
  await registerPage.navigateToRegisterUserPage();
  await registerPage.navigateToRegisterPage()
  const email = await registerPage.fillRegistrationForm({ ...testData.registerUser,email: undefined});
  await registerPage.clickRegister();
  await registerAssert.verifyRegistrationSuccess();
  await registerPage.fillRegistrationForm({...testData.registerUser,email})
  //i know
  await registerPage.clickRegister();
  await registerAssert.verifyDuplicateEmailErrorMessage();
})
