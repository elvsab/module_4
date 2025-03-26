export default class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItem = page.locator('.cart_item');
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async removeItemFromCart() {
        await this.removeButton.click();
    }

    async isCartItemVisible() {
        return await this.cartItem.isVisible();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}
