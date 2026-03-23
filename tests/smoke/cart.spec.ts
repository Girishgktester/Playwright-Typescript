import { test } from '@fixtures/objectsFixtures';

// 🔹 GUEST TESTS (no login)
test.describe('Guest cart flow', () => {
  test.use({ storageState: undefined });
  test('Add invalid quantity', async ({ homePage, homePageAssertion, cartPage, produtAssertion, pdp, basePage, page }) => {
    console.log(await page.context().storageState());
    await basePage.goto("https://demowebshop.tricentis.com/");
    await homePage.navigateToMenu('Electronics');
    await homePageAssertion.navigateToSubMenu('Cell phones');
    await cartPage.naviagteToPDP();
    await produtAssertion.verifyProductDetailPage();
    await pdp.addSmartPhoneToCart();
    await produtAssertion.verifyNotification();
  });
});

// 🔹 LOGGED-IN TESTS
test.describe('User cart flow', () => {
  test.use({ storageState: 'storageState.json' });
  test('Add to cart (CORE FLOW)', async ({ homePage, homePageAssertion, cartPage, produtAssertion, pdp, cartAssertion, basePage }) => {
    await basePage.goto("https://demowebshop.tricentis.com/");
    await homePage.navigateToMenu('Electronics');
    await homePageAssertion.navigateToSubMenu('Cell phones');
    await cartPage.naviagteToPDP();
    await produtAssertion.verifyProductDetailPage();
    await pdp.addSmartPhoneToCart();
    await produtAssertion.verifyNotification();
    const productName = await pdp.fetchProductNameFromPDP();
    await cartAssertion.verifyCartQTY();
    await cartPage.navigateToCart();
    await cartAssertion.verifyProductNameInCart(productName);
    await cartAssertion.productQtyINCart();
    await cartPage.updateCartQty();
    await cartAssertion.verifyProdutQtyAfterUpdate();
  });
});


test('Add invalid quantitys', async ({ homePage, homePageAssertion, cartPage, produtAssertion, pdp, basePage, page }) => {
  console.log(await page.context().storageState());
  await basePage.goto("https://demowebshop.tricentis.com/");
  await homePage.navigateToMenu('Electronics');
  await homePageAssertion.navigateToSubMenu('Cell phones');
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
  await pdp.addSmartPhoneToCart();
  await produtAssertion.verifyNotification();
});
