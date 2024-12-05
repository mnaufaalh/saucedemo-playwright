const { test, expect } = require('@playwright/test');
const { LoginPage } = require('@pom/login_page/loginPage');
const { HomePage } = require('@pom/home_page/homePage');
const { CartPage } = require('@pom/cart_page/cartPage');
const { faker } = require('@faker-js/faker');

test.describe('Full Flow', () => {
  test('should able success to checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
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

    await page.goto('https://www.saucedemo.com/');
    await loginPage.loginFlow('standard_user', 'secret_sauce');
    const totalLists = await homePage.inventoryItem.count();
    const totalSelectedItems = 2;
    const arrayOfId = await functionRandomNumber(
      totalLists - 1,
      totalSelectedItems
    );
    let arrayOfItemName = [];
    let arrayOfItemDesc = [];
    let arrayOfItemPrice = [];
    for (let i = 0; i < arrayOfId.length; i++) {
      await homePage.addToCartButton(arrayOfId[i]);
      arrayOfItemName.push(
        await homePage.inventoryItemNameText.nth(i).textContent()
      );
      const priceItem = await homePage.inventoryItemPriceText
        .nth(i)
        .textContent();
      arrayOfItemPrice.push(priceItem.replace('$', ''));
      arrayOfItemDesc.push(
        await homePage.inventoryItemDescriptionText.nth(i).textContent()
      );
    }
    await homePage.cartButton.click();
    for (let i = 0; i < arrayOfId; i++) {
      expect(await cartPage.inventoryItemNameText.textContent()).toBe(
        arrayOfItemName[i]
      );
      expect(await cartPage.inventoryItemPriceText.textContent()).toBe(
        `$${arrayOfItemPrice[i]}`
      );
      expect(await cartPage.inventoryItemNameText.textContent()).toBe(
        arrayOfItemDesc[i]
      );
    }
    const idRemoveItem = faker.number.int(arrayOfId.length - 1);
    await cartPage.removeItemButton(idRemoveItem);
    const itemNameCheckout = await cartPage.inventoryItemNameText.textContent();
    const itemPriceCheckout =
      await cartPage.inventoryItemPriceText.textContent();
    const itemDescCheckout =
      await cartPage.inventoryItemDescriptionText.textContent();
    await cartPage.checkoutButton.click();
    await cartPage.firstNameField.fill(faker.person.firstName());
    await cartPage.lastNameField.fill(faker.person.lastName());
    await cartPage.postalCodeField.fill(faker.location.buildingNumber());
    await cartPage.continueButton.click();
    expect(await cartPage.inventoryItemNameText.textContent()).toBe(
      itemNameCheckout
    );
    expect(await cartPage.inventoryItemPriceText.textContent()).toBe(
      itemPriceCheckout
    );
    expect(await cartPage.inventoryItemDescriptionText.textContent()).toBe(
      itemDescCheckout
    );
    await cartPage.finishButton.click();
    expect(await cartPage.backToHomeButton).toBeVisible();
  });
});
