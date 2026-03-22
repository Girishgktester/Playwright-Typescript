import { test } from '@fixtures/objectsFixtures';
import { testData } from '@test-data/users';

test('Search with valid keyword', async ({ loginPage, searchPage, searchAssertion }) => {
  await loginPage.gotoUrl();
  await searchPage.inputSearch(testData.search.searchKey1);
  await searchAssertion.verifySearchResult(testData.search.searchKey1)
})

test('Search with invalid keyword', async ({ loginPage, searchPage, searchAssertion }) => {
  await loginPage.gotoUrl();
  await searchPage.inputSearch(testData.search.searchInvalidKey);
  await searchAssertion.verifyInvalidSearch();
})

test('Navigate category → product list → PDP', async ({ loginPage, searchPage, searchAssertion, cartPage, produtAssertion }) => {
  await loginPage.gotoUrl();
  await searchPage.inputSearch(testData.search.searchKey1);
  await searchAssertion.verifySearchResult(testData.search.searchKey1)
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
})


