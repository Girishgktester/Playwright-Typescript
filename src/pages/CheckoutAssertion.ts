import { Page, expect } from '@playwright/test';
import { ProductDetailsPage } from './ProductDetailsPage';
import { CheckoutPage } from './CheckoutPage';

export default class CheckoutAssertion {

    constructor(private page: Page, private checkoutPage: CheckoutPage) {
    }
}