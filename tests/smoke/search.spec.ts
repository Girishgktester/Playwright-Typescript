import { test } from '@fixtures/objectsFixtures';
import { testData } from '@test-data/users';

test('Search with valid keyword', async ({ basePage, loginAssertion, searchPage, searchAssertion }) => {
  await basePage.goto("https://demowebshop.tricentis.com/");
  await searchPage.inputSearch(testData.search.searchKey1);
  await searchAssertion.verifySearchResult(testData.search.searchKey1)
})

test('Search with invalid keyword', async ({ basePage, searchPage, searchAssertion }) => {
  await basePage.goto("https://demowebshop.tricentis.com/");
  await searchPage.inputSearch(testData.search.searchInvalidKey);
  await searchAssertion.verifyInvalidSearch();
})

test('Navigate category → product list → PDP', async ({ basePage, searchPage, searchAssertion, cartPage, produtAssertion }) => {
  await basePage.goto("https://demowebshop.tricentis.com/");
  await searchPage.inputSearch(testData.search.searchKey1);
  await searchAssertion.verifySearchResult(testData.search.searchKey1)
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
})
