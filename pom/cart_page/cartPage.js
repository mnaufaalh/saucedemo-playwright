exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.inventoryItemNameText = page.locator(
      '[data-test="inventory-item-name"]'
    );
    this.inventoryItemPriceText = page.locator(
      '[data-test="inventory-item-price"]'
    );
    this.inventoryItemDescriptionText = page.locator(
      '[data-test="inventory-item-desc"]'
    );
    this.checkoutButton = page.locator('#checkout');
    this.firstNameField = page.locator('#first-name');
    this.lastNameField = page.locator('#last-name');
    this.postalCodeField = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.backToHomeButton = page.locator('#back-to-products');
  }

  async removeItemButton(index) {
    const itemName = await this.inventoryItemNameText.nth(index).textContent();
    await this.page
      .locator(
        `[data-test="remove-${itemName.toLowerCase().split(' ').join('-')}"]`
      )
      .click();
  }
};
