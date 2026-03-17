// pages/HomePage.ts
import { Page } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';
import ProductCardCompo from '@components/ProductCardCompo';

export class HomePage {

    navbar: NavbarComponent
    productCard: ProductCardCompo;

    constructor(private page: Page) {

        this.navbar = new NavbarComponent(page)
        this.productCard = new ProductCardCompo(page);

    }

    async addProduct(product: string) {
        await this.productCard.addProductToCart(product);
    }

}