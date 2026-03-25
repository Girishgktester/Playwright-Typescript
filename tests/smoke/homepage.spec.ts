import { test } from '@fixtures/objectsFixtures';
import'@fixtures/baseTest';

const menuData = [
  { main: 'Computers', sub: ['Desktops', 'Notebooks', 'Accessories'] },
  { main: 'Electronics', sub: ['Camera, photo', 'Cell phones'] }
];

for (const menu of menuData) {
  test(`Verify ${menu.main} menu`,{tag: ['@smoke']},  async ({ basePage, homePage, homePageAssertion }) => {
    
    await homePage.navigateToMenu(menu.main);
    await homePageAssertion.verifyMenuItems(menu.sub);
  });
}

