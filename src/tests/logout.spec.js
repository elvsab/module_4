import { test, expect } from '@playwright/test';
import LoginPage from '../po/pages/loginPage';
import { BASE_URL, USERNAME, PASSWORD } from './testData';

test.describe('Logout Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        const loginPage = new LoginPage(page);
        await loginPage.login(USERNAME, PASSWORD);
    });

    test('Logout from the system', async ({ page }) => {
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL(BASE_URL);
    });
});
