import { Page } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';
import ProductCardCompo from '@components/ProductCardCompo';

export class ProductDetailsPage {

    navbar: NavbarComponent
    readonly addToCartBtn;
    readonly productName;
    readonly productShortDesc;
    readonly productAvailability;
    readonly productRatings;
    readonly productReviews;
    readonly productPrice
    readonly productAddToCartBtn;
    readonly productAddtoWishlist;
    readonly productEmailFriend;
    readonly productAddToCompare;
    readonly sucessNotification;
    readonly openProductDetailsPage;
    readonly addToCartBtnPDP;



    constructor(private page: Page) {
        this.navbar = new NavbarComponent(page)
        this.addToCartBtn = page.getByRole('link', { name: 'Smartphone' }).first();
        this.productName = page.locator('.product-name').first();
        this.productShortDesc = page.locator('.short-description').first();
        this.productAvailability = page.locator('.product-name')
        this.productRatings = page.locator('.rating').first();
        this.productReviews = page.locator('.product-review-links')
        this.productPrice = page.locator('.product-price')
        this.productAddToCartBtn = page.locator('#add-to-cart-button-43')
        this.productAddtoWishlist = page.locator('#add-to-wishlist-button-43')
        this.productEmailFriend = page.locator('.email-a-friend')
        this.productAddToCompare = page.locator('.compare-products')
        this.sucessNotification = page.locator('.bar-notification')
        this.openProductDetailsPage = page.getByRole('link', { name: 'Smartphone' }).first();

    }

    async addSmartPhoneToCart() {
        await this.productAddToCartBtn.click();
    }


    async fetchProductNameFromPDP() {
        return await this.productName.textContent();
    }

}