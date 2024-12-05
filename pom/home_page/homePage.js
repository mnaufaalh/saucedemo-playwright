exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.totalItemInCart = page.locator('[data-test="shopping-cart-badge"]');
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
  }

  async addToCartButton(index) {
    const itemName = await this.inventoryItemNameText.nth(index).textContent();
    await this.page
      .locator(
        `[data-test="add-to-cart-${itemName
          .toLowerCase()
          .split(' ')
          .join('-')}"]`
      )
      .click();
  }
};
