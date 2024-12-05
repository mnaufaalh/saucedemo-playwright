const { test, expect } = require('@playwright/test');
const { LoginPage } = require('@pom/login_page/loginPage');
const { HomePage } = require('@pom/home_page/homePage');
const { faker } = require('@faker-js/faker');

let totalLists;
let totalSelectedItems;
const functionRandomNumber = async (total, count) => {
  const numbers = [];

  while (numbers.length < count) {
    const randomNumber = faker.number.int(total);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
};

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await page.goto('https://www.saucedemo.com/');
  await loginPage.loginFlow('standard_user', 'secret_sauce');
  totalLists = await homePage.inventoryItem.count();
});

test.describe('Add To Cart', () => {
  test('should able select 2 items', async () => {
    totalSelectedItems = 2;
  });
  test('should able select 3 items', async () => {
    totalSelectedItems = 3;
  });
  test('should able select 4 items', async () => {
    totalSelectedItems = 4;
  });
  test.afterEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const arrayOfId = await functionRandomNumber(
      totalLists - 1,
      totalSelectedItems
    );
    for (let i = 0; i < arrayOfId.length; i++) {
      await homePage.addToCartButton(arrayOfId[i]);
    }
    expect(parseInt(await homePage.totalItemInCart.textContent())).toBe(
      totalSelectedItems
    );
  });
});
