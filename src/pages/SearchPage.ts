import { Page, Locator, expect } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';
import BasePage from '@utils/BasePage';

export default class SearchPage extends BasePage {

    navbar: NavbarComponent

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly productNameINSearch: Locator
    readonly invalidSearch: Locator

    constructor(page: Page) {
        super(page);

        this.navbar = new NavbarComponent(page)
        this.emailInput = page.locator('#Email');
        this.productNameINSearch = page.locator('.product-title');
        this.invalidSearch = page.getByText('No products were found that matched your criteria.'
        );
    }

    async inputSearch(searchKey: string) {
        await this.navbar.inputSearch(searchKey)
    }

    async getProductNameFromSearch() {
        return await this.productNameINSearch.textContent();
    }





}