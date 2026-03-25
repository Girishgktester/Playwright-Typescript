import { test } from '@fixtures/objectsFixtures';
import { testData } from '@test-data/users';
import'@fixtures/baseTest';

test('@smoke Search with valid keyword',{tag: ['@smoke']},  async ({searchPage, searchAssertion }) => {
  await searchPage.inputSearch(testData.search.searchKey1);
  await searchAssertion.verifySearchResult(testData.search.searchKey1)
})

test('Search with invalid keyword',{tag: ['@smoke']},  async ({searchPage, searchAssertion }) => {
  await searchPage.inputSearch(testData.search.searchInvalidKey);
  await searchAssertion.verifyInvalidSearch();
})

test('Navigate category → product list → PDP',{tag: ['@smoke']},  async ({searchPage, searchAssertion, cartPage, produtAssertion }) => {
  await searchPage.inputSearch(testData.search.searchKey1);
  await searchAssertion.verifySearchResult(testData.search.searchKey1)
  await cartPage.naviagteToPDP();
  await produtAssertion.verifyProductDetailPage();
})
