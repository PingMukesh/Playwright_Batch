import { test } from "../fixtures/testFixtures";
import { chromium } from "@playwright/test";


test("Multiple Browser Context", async () => {

    const browser = await chromium.launch({ headless: false });

    const constext1 = await browser.newContext();
    const constext2 = await browser.newContext();

    const page1 = await constext1.newPage();
    const page2 = await constext2.newPage();

    await page1.goto('https://www.saucedemo.com/');
    await page1.locator('[data-test="username"]').click();
    await page1.locator('[data-test="username"]').fill('standard_user');
    await page1.locator('[data-test="username"]').press('Tab');
    await page1.locator('[data-test="password"]').fill('secret_sauce');
    await page1.locator('[data-test="password"]').press('Tab');
    await page1.locator('[data-test="login-button"]').press('Enter');
    await page1.getByText('Swag Labs').click();
    await page1.locator('[data-test="title"]').click();
    await page1.locator('[data-test="shopping-cart-link"]').click();
    await page1.locator('[data-test="continue-shopping"]').click();
    await page1.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page1.locator('[data-test="shopping-cart-link"]').click();
    await page1.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page1.locator('[data-test="checkout"]').click();
    await page1.locator('[data-test="continue"]').click();
    await page1.locator('[data-test="error"]').click();
    await page1.locator('[data-test="postalCode"]').click();
    await page1.locator('[data-test="lastName"]').click();
    await page1.locator('[data-test="firstName"]').click();
    const web = await page2.goto("https://www.saucedemo.com/");
    await page1.screenshot({ path: "screenshot.png" })


    await page1.locator("#user-name").fill("standard_user");
    await page1.locator("#password").fill("secret_sauce");
    await page1.locator("#login-button").click();

    await page2.locator("#user-name").fill("Dummyuser");
    await page2.locator("#password").fill("Dummy");
    await page2.locator("#login-button").click();

    console.log(page1.url());
    console.log(page2.url());

    await browser.close();
});