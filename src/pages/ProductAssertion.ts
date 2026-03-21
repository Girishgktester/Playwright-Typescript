import { Page, expect } from '@playwright/test';
import { CartPage } from '@pages/CartPage'
import { ProductDetailsPage } from './ProductDetailsPage';

export default class ProductAssertion {
    constructor(private page: Page, private productDetailsPage: ProductDetailsPage) { }

    async navigateToSubMenu(menuItems: string) {
        const menu = this.page.locator('.sublist.firstLevel.active').getByRole('link', { name: menuItems });
        await menu.click();
    }

    async verifyProductDetailPage() {
        await expect(this.productDetailsPage.productShortDesc).toBeVisible();
        await expect(this.productDetailsPage.productName).toBeVisible();
        await expect(this.productDetailsPage.productAvailability).toBeVisible();
        await expect(this.productDetailsPage.productRatings).toBeVisible();
        await expect(this.productDetailsPage.productReviews).toBeVisible();
        await expect(this.productDetailsPage.productPrice).toBeVisible();
        await expect(this.productDetailsPage.productAddToCartBtn).toBeVisible();
        await expect(this.productDetailsPage.productAddtoWishlist).toBeVisible();
        await expect(this.productDetailsPage.productEmailFriend).toBeVisible();
        await expect(this.productDetailsPage.productAddToCompare).toBeVisible();
    }

    async verifyNotification(){
        await expect(this.productDetailsPage.sucessNotification).toHaveText('The product has been added to your shopping cart')

    }
}