<<<<<<< HEAD
const { test, expect } = require('@playwright/test');
const { findPackageJSON } = require('module');

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
=======
import { test } from '@playwright/test';
//const { findPackageJSON } = require('module');
import * as chai from 'chai';
import { BASE_URL, USERNAME, PASSWORD } from './testData.js';

const { expect, assert, should } = chai;
should();
>>>>>>> c2dd416 (Made fixes with chai to  alpha branch)

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', USERNAME);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');
<<<<<<< HEAD
  await expect(page).toHaveURL(BASE_URL + 'inventory.html');
=======
  const currentURL = page.url();
  assert.equal(currentURL, BASE_URL + 'inventory.html');
>>>>>>> c2dd416 (Made fixes with chai to  alpha branch)
  await page.waitForSelector('.inventory_list');
});

test.describe('SauceDemo Automation Tests', () => {
<<<<<<< HEAD
//1
  test('Successful login with valid credentials', async ({ page }) => {
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
//2
=======

  test('Successful login with valid credentials', async ({ page }) => {
    const isVisible = await page.locator('.inventory_list').isVisible();
    isVisible.should.be.true;
  });

>>>>>>> c2dd416 (Made fixes with chai to  alpha branch)
  test('Login failure with incorrect password', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', USERNAME);
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');
<<<<<<< HEAD
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
=======
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

>>>>>>> c2dd416 (Made fixes with chai to  alpha branch)
  test('Product removal from the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
<<<<<<< HEAD
    await expect(page.locator('.cart_item')).not.toBeVisible();
  });
//5
=======
    const cartItemVisible = await page.locator('.cart_item').isVisible();
    assert.isFalse(cartItemVisible, 'Cart item should be hidden');
  });

>>>>>>> c2dd416 (Made fixes with chai to  alpha branch)
  test('Successful checkout completion', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
<<<<<<< HEAD
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
//6
  test('Logout from the system', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL(BASE_URL);
  });
//7
=======
    const completionText = await page.locator('.complete-header').innerText();
    expect(completionText).to.equal('Thank you for your order!');
  });

  test('Logout from the system', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    const currentURL = page.url();
    assert.equal(currentURL, BASE_URL, 'URL should be on main page after exit');
  });

>>>>>>> c2dd416 (Made fixes with chai to  alpha branch)
  test('Returning to the store after viewing the cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');
<<<<<<< HEAD
    await expect(page.locator('.inventory_list')).toBeVisible();
=======
    const isVisible = await page.locator('.inventory_list').isVisible();
    expect(isVisible).to.be.true;
>>>>>>> c2dd416 (Made fixes with chai to  alpha branch)
  });
});
