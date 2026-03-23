import { Page } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';

export class CheckoutPage {

    navbar: NavbarComponent
    readonly addToCartBtnPDP;
    readonly cartQty;
    readonly productQTYInCart
    readonly inputCart;
    readonly getInputCartValue;

    constructor(private page: Page) {
        this.navbar = new NavbarComponent(page)
        this.addToCartBtnPDP = page.locator('.product-title').first();
   
    }


}