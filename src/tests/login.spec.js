import { test, expect } from '@playwright/test';
import LoginPage from '../po/pages/loginPage';
import { BASE_URL, USERNAME, PASSWORD} from './testData';

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('Successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL(BASE_URL + 'inventory.html');
    });

    test('Login failure with incorrect password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, 'wrong_password');
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toBe('Epic sadface: Username and password do not match any user in this service');
    });
});
