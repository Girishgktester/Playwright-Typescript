import { test as base } from '@playwright/test';
import LoginPage from '@pages/LoginPage';
import LogininAssertion from '@pages/LoginAssertion';

type MyFixtures = {
    loginPage: LoginPage;
    loginAssertion: LogininAssertion;
};


export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    loginAssertion: async ({ page, loginPage }, use) => {
        await use(new LogininAssertion(page, loginPage));
    },
});

test.use({
    storageState: 'storageState.json'
});