import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";


When("I sort the products by price high to low", async function (this: CustomWorld) {
    await this.productsPage.sortByPriceHighToLow();
});

Then ("products should be sorted by price high to low", async function (this: CustomWorld) {
    await this.productsPage.verifyPricesDesc();
});

When ("I add {string} to the cart", async function (this: CustomWorld, productName: string) {
    await this.productsPage.addProductToCart(productName);
});

Then("the cart badge should be shown as {string}", async function (this: CustomWorld, expectedCount: string) {
    await this.productsPage.verifyCartCount(expectedCount);
});