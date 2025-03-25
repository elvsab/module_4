import { test } from '@playwright/test';
import * as chai from 'chai';
import { BASE_URL, USERNAME, PASSWORD } from './testData.js';

const { expect, assert, should } = chai;
should();

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', USERNAME);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');
  const currentURL = page.url();
  assert.equal(currentURL, BASE_URL + 'inventory.html');
  await page.waitForSelector('.inventory_list');
});

test.describe('SauceDemo Automation Tests', () => {

  test('Successful login with valid credentials', async ({ page }) => {
    const isVisible = await page.locator('.inventory_list').isVisible();
    isVisible.should.be.true;
  });

  test('Login failure with incorrect password', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', USERNAME);
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');
    const errorText = await page.locator('[data-test="error"]').innerText();
    expect(errorText).to.equal(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Successful product addition to the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartCount = await page.locator('.shopping_cart_badge').innerText();
    cartCount.should.equal('1');
  });

  test('Product removal from the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    const cartItemVisible = await page.locator('.cart_item').isVisible();
    assert.isFalse(cartItemVisible, 'Cart item should be hidden');
  });

  test('Successful checkout completion', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    const completionText = await page.locator('.complete-header').innerText();
    expect(completionText).to.equal('Thank you for your order!');
  });

  test('Logout from the system', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    const currentURL = page.url();
    assert.equal(currentURL, BASE_URL, 'URL should be on main page after exit');
  });

  test('Returning to the store after viewing the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');
    const isVisible = await page.locator('.inventory_list').isVisible();
    expect(isVisible).to.be.true;
  });
});
