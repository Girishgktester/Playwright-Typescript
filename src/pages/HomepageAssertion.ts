import { Page, expect } from '@playwright/test';
import { HomePage } from '@pages/Homepage';

export default class HomepageAssertion {
    constructor(private page: Page, private homepage: HomePage) { }

    async navigateToSubMenu(menuItems: string) {
        const menu = this.page.locator('.sublist.firstLevel.active').getByRole('link', { name: menuItems });
        await menu.click();
    }

    async verifyMenuItems(names: string[]) {
        for (const menu of names) {
            await expect(this.homepage.getTab(menu)).toBeVisible();
        }
    }
}