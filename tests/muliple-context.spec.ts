import { test } from "../fixtures/testFixtures";
import { chromium } from "@playwright/test";


test("Multiple Browser Context", async () => {

    const browser = await chromium.launch({ headless: false });

    const constext1 = await browser.newContext();
    const constext2 = await browser.newContext();

    const page1 = await constext1.newPage();
    const page2 = await constext2.newPage();

    await page1.goto("https://www.saucedemo.com/");
    await page2.goto("https://www.saucedemo.com/");


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