// components/ProductCardCompo.ts
import { Page } from '@playwright/test';

export default class ProductCardCompo {

  constructor(private page: Page) {}

  async addProductToCart(productName: string) {

    const product = this.page.locator('.product', {
      hasText: productName
    });

    await product.locator('button:has-text("Add to cart")').click();
  }

}