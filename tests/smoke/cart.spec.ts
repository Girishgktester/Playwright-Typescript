import { test } from '@fixtures/objectsFixtures';
import { ProductDetailsPage } from '@pages/ProductDetailsPage';

test('Add to cart (CORE FLOW)', async ({ loginPage,
  homePage, homePageAssertion,
  cartPage, produtAssertion,
  pdp, cartAssertion }) => {

  await loginPage.gotoUrl();
  await homePage.navigateToMenu('Electronics');
  await homePageAssertion.navigateToSubMenu('Cell phones');
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
  await pdp.addSmartPhoneToCart();
  await produtAssertion.verifyNotification();
  const productName = await pdp.fetchProductNameFromPDP()
  await cartAssertion.verifyCartQTY();
  await cartPage.navigateToCart();
  await cartAssertion.verifyProductNameInCart(productName);
  await cartAssertion.productQtyINCart();
  await cartPage.updateCartQty();
  await cartAssertion.verifyProdutQtyAfterUpdate();

});

test('Add invalid quantity', async ({ loginPage,homePage, homePageAssertion,cartPage, produtAssertion, pdp, cartAssertion }) => {
 await loginPage.gotoUrl();
  await homePage.navigateToMenu('Electronics');
  await homePageAssertion.navigateToSubMenu('Cell phones');
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
  await pdp.addSmartPhoneToCart();
  await produtAssertion.verifyNotification();
  const productName = await pdp.fetchProductNameFromPDP()
  
});

