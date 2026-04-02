import { test } from '@fixtures/objectsFixtures';
import { log } from 'node:console';

test.describe('Guest cart flow', { tag: ['@sanity'] }, () => {
  test('Add invalid quantity', async ({basePage,  loginPageE }) => {
    await basePage.goto('/login.html')
    await loginPageE.verifyLoginToApplication();
    await loginPageE.verifyLogginScreen();
  });
});
