import { test, expect } from '@playwright/test';
import LoginPage  from '../po/pages/loginPage';
import InventoryPage from '../po/pages/inventoryPage';
import CartPage from '../po/pages/cartPage';
import CheckoutPage from '../po/pages/checkoutPage';
import { BASE_URL, USERNAME, PASSWORD }  from './testData';

test.describe('Checkout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, PASSWORD);
    });

    test('Successful checkout completion', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await inventoryPage.addToCart();
        await inventoryPage.openCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();
        const completionMessage = await checkoutPage.getCompletionMessage();
        expect(completionMessage).toBe('Thank you for your order!');
    });
});
