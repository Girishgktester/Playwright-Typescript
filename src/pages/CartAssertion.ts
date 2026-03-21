import { Page, expect } from '@playwright/test';
import { CartPage } from '@pages/CartPage';
import { ProductDetailsPage } from './ProductDetailsPage';

export default class CartAssertion {
    private pdp: ProductDetailsPage;

    constructor(private page: Page, private cartPage: CartPage) {
        this.pdp = new ProductDetailsPage(page);
    }

    async navigateToSubMenu(menuItems: string) {
        const menu = this.page.locator('.sublist.firstLevel.active').getByRole('link', { name: menuItems });
        await menu.click();
    }

    async verifyCartQTY() {
        await expect(this.cartPage.cartQty).toHaveText('(1)');
    }

    async verifyProductNameInCart(name: string) {
        await expect(this.pdp.productName).toHaveText(name);
    }

    async productQtyINCart() {
        await expect(this.cartPage.productQTYInCart).toHaveValue('1')
    }

    async verifyProdutQtyAfterUpdate() {
        await expect(this.cartPage.getInputCartValue).toHaveValue('2');
    }
}