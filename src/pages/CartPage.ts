import { Page } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';

export class CartPage {

    navbar: NavbarComponent
    readonly addToCartBtnPDP;
    readonly cartQty;
    readonly productQTYInCart
    readonly inputCart;
    readonly getInputCartValue;

    constructor(private page: Page) {
        this.navbar = new NavbarComponent(page)
        this.addToCartBtnPDP = page.getByRole('link', { name: 'Smartphone' }).first();
        this.cartQty = page.locator('.ico-cart').first()
        this.cartQty = page.locator('.cart-qty').first()
        this.productQTYInCart = page.locator('.qty-input')
        this.inputCart = page.locator('input.qty-input');
        // this.getInputCartValue = page.locator('.qty nobr').first();    
        this.getInputCartValue = page.locator('input.qty-input');


    }

    async naviagteToPDP() {
        await this.addToCartBtnPDP.click();
    }

    async navigateToCart() {
        await this.cartQty.click();
    }

    async updateCartQty() {
        await this.inputCart.click();
        await this.inputCart.fill('2');
        await this.inputCart.press('Enter');
    }
}