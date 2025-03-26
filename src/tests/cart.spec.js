import { test, expect }  from '@playwright/test';
import LoginPage  from '../po/pages/loginPage';
import InventoryPage from '../po/pages/inventoryPage';
import CartPage from '../po/pages/cartPage';
import { BASE_URL, USERNAME, PASSWORD }  from './testData';

test.describe('Cart Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, PASSWORD);
    });

    test('Successful product addition to the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addToCart();
        await inventoryPage.openCart();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('Product removal from the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        
        await inventoryPage.addToCart();
        await inventoryPage.openCart();
        await cartPage.removeItemFromCart();
        await expect(cartPage.isCartItemVisible()).resolves.toBeFalsy();
    });

    test('Returning to the store after viewing the cart', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="continue-shopping"]');
        
        const isVisible = await page.locator('.inventory_list').isVisible();
        expect(isVisible).toBeTruthy();
    });
});
