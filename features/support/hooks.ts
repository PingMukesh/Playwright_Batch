import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";
import { LoginPage } from "../../page/LoginPage";
import { ProductsPage } from "../../page/ProductsPage";
import { CheckoutPage } from "../../page/CheckoutPage";
import { DemoQAPage } from "../../page/DemoQAPage";


setDefaultTimeout(60 * 1000);


Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
        headless: false
    });

    this.page = await this.browser.newPage();

    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.demoQAPage = new DemoQAPage(this.page);
});

After(async function (this: CustomWorld) {
    if (this.browser) {
        await this.browser.close();
    }

});