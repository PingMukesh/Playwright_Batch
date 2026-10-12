import { test, chromium } from "@playwright/test";

test("Browser Context Demo", async () => {

    // 1. Launch Browser
    const browser = await chromium.launch({
        headless: false
    });

    // 2. Create Browser Context
    const context = await browser.newContext();

    // 3. Create Page / Tab
    const page = await context.newPage();

    // 4. Navigate
    await page.goto("https://www.saucedemo.com/");

    // 5. Print information
    console.log("Page URL:", page.url());
    console.log("Page Title:", await page.title());

    // 6. Close browser
    await browser.close();
});