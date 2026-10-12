import { test, expect } from "../fixtures/testFixtures";

test.describe("Products Page Tests", () => {

    test.beforeEach(async ({ loginpage }) => {
        await loginpage.open("/");
        await loginpage.login("standard_user", "secret_sauce");
        await loginpage.verifyLoginSuccess();
    });

    test("Verify products page header and items display", async ({ productpage }, testInfo) => {
        await productpage.verifyProductsPage(testInfo);
        const count = await productpage.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test("Sort products by price (High to Low)", async ({ productpage }, testInfo) => {
        await productpage.sortByPriceHighToLow();
        await productpage.verifySortOption("hilo", testInfo);
        await productpage.verifyPricesDesc(testInfo);
    });

    test("Sort products by price (Low to High)", async ({ productpage }) => {
        await productpage.sortByPriceLowToHigh();
    });

    test("Add a product to cart and verify cart badge count", async ({ productpage }, testInfo) => {
        await productpage.addProductToCart("Sauce Labs Backpack");
        await productpage.verifyCartCount("1", testInfo);
    });

    test("Open cart and verify added product is displayed", async ({ productpage }, testInfo) => {
        const item = "Sauce Labs Backpack";
        await productpage.addProductToCart(item);
        await productpage.openCart();
        await productpage.verifyProductInCart(item, testInfo);
    });

});
