import { test } from '@fixtures/objectsFixtures';
import'@fixtures/baseTest';

test('Add invalid quantity',{tag: ['@smoke']},  async ({ homePage, homePageAssertion,cartPage, produtAssertion, pdp, checkoutAssertion , checkoutPage , basePage }) => {
  await homePage.navigateToMenu('Electronics');
  await homePageAssertion.navigateToSubMenu('Cell phones');
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
  await pdp.addSmartPhoneToCart();
  await produtAssertion.verifyNotification();
  const productName = await pdp.fetchProductNameFromPDP()
});

