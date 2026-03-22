import { Page, expect } from '@playwright/test';
import searchPage from './SearchPage';
import SearchPage from './SearchPage';

export default class SearchAssertions {
    constructor(private page: Page, private searchPage: SearchPage) { }

    async verifySearchResult(searchKey: string) {
        await this.searchPage.productNameINSearch.waitFor({ state: 'visible' });
        console.log('COUNT:', await this.searchPage.productNameINSearch.count());
        const first = this.searchPage.productNameINSearch.first();
        console.log('TEXT CONTENT:', await first.textContent());
        console.log('INNER TEXT:', await first.innerText());
        await expect(this.searchPage.productNameINSearch).toHaveText(searchKey);
        //await expect(this.searchPage.productNameINSearch).toHaveText(/searchKey/i);
    }

    async verifyInvalidSearch() {
        await expect(this.searchPage.invalidSearch).toBeVisible();
    }
}