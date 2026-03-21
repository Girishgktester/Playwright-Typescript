// pages/HomePage.ts
import { Page } from '@playwright/test';
import NavbarComponent from '../components/NavbarComponent';
import ProductCardCompo from '@components/ProductCardCompo';

export class HomePage {

    navbar: NavbarComponent
    productCard: ProductCardCompo;
    readonly tabs;

    constructor(private page: Page) {

        this.navbar = new NavbarComponent(page)
        this.productCard = new ProductCardCompo(page);
        this.tabs = page.locator("");

    }

    async addProduct(product: string) {
        await this.productCard.addProductToCart(product);
    }

    async navigateToMenu(menu: string) {
        await this.navbar.hoverOnMenu(menu);
    }

    async clickOnMenu() {
        (await this.navbar.getHomeTab()).click();

    }

    getTab(name: string) {
        return this.page.locator('.sublist.firstLevel.active').getByRole('link', { name: name })
    }
}