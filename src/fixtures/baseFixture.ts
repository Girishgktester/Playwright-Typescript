// below appraoch shows using 2 fixtuires in a same file

// import { test as base, Page } from '@playwright/test';

// type MyFixtures = {
//   basePage: Page;
//   loggedInPage: Page;

// };

// export const test = base.extend<MyFixtures>({
//   basePage: async ({ page }, use) => {
//     await page.goto('https://www.saucedemo.com');
//     await use(page);
//   },

//     // loggedInPage: async ({ basePage }, use) => {
//     // await basePage.getByPlaceholder('Username').fill('standard_user');
//     // await basePage.getByPlaceholder('Password').fill('secret_sauce');
//     // await basePage.getByRole('button', { name: 'Login' }).click();

//     // await use(basePage);
// //   }
// });




// baseFixture.ts
//  this approcvah is used to test 2 sepesrte fixtures in a different file and use them in the same test file
import { test as base, Page } from '@playwright/test';

export const baseTest = base.extend<{
  basePage: Page;
}>({
  basePage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await use(page);
  }
});