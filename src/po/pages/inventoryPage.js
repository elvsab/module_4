export default class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async isProductListVisible() {
        return await this.productList.isVisible();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async openCart() {
        await this.cartIcon.click();
    }
}
