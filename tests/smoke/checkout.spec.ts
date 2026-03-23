import { test } from '@fixtures/objectsFixtures';

test('Add invalid quantity', async ({ loginPage,homePage, homePageAssertion,cartPage, produtAssertion, pdp, checkoutAssertion , checkoutPage }) => {
 await loginPage.gotoUrl();
  await homePage.navigateToMenu('Electronics');
  await homePageAssertion.navigateToSubMenu('Cell phones');
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
  await pdp.addSmartPhoneToCart();
  await produtAssertion.verifyNotification();
  const productName = await pdp.fetchProductNameFromPDP()
});

