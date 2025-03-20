const { test, expect } = require('@playwright/test');
const { findPackageJSON } = require('module');

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', USERNAME);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(BASE_URL + 'inventory.html');
  await page.waitForSelector('.inventory_list');
});

test.describe('SauceDemo Automation Tests', () => {
//1
  test('Successful login with valid credentials', async ({ page }) => {
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
//2
  test('Login failure with incorrect password', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', USERNAME);
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
//3
  test('Successful product addition to the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
//4
  test('Product removal from the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('.cart_item')).not.toBeVisible();
  });
//5
  test('Successful checkout completion', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
//6
  test('Logout from the system', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL(BASE_URL);
  });
//7
  test('Returning to the store after viewing the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
