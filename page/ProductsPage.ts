import { Page, TestInfo, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {

    private productsTitle = this.page.getByText("Products", { exact: true });
    private inventoryContainer = ".inventory_container";
    private BackpackImage = this.page.getByAltText("Sauce Labs Backpack");
    private sortDropdown = this.page.locator(".product_sort_container");
    private cartBadge = this.page.locator(".shopping_cart_badge");
    private cartLink = this.page.locator(".shopping_cart_link");
    private inventoryItem = this.page.locator(".inventory_item");
    private itemPrices = this.page.locator(".inventory_item_price");

    constructor(page: Page) {
        super(page);
    }

    async verifyProductsPage(TestInfo: TestInfo): Promise<void> {

        try {
            await expect(this.productsTitle).toBeVisible();
            await expect(this.BackpackImage).toBeVisible();
            await expect(this.page.locator(this.inventoryContainer)).toBeVisible();
        } catch (err) {
            await this.capturefailureScreenshot(TestInfo, "Product_tilte_assetrt_failure");
            throw err;
        };

    }

    async sortByPriceHighToLow(): Promise<void> {
        await this.sortDropdown.selectOption("hilo");
    }

    async sortByPriceLowToHigh(): Promise<void> {
        await this.sortDropdown.selectOption("lohi");
    }

    async verifySortOption(expectedValue: string, testInfo: TestInfo): Promise<void> {

        try {
            await expect(this.sortDropdown).toHaveValue(expectedValue);
        }
        catch (err) {
            await this.capturefailureScreenshot(testInfo, "Sort_option_verify_failure");
            throw err;
        }
    }

    async verifyPricesDesc(testInfo: TestInfo): Promise<void> {
        try {
            const priceText = await this.itemPrices.allTextContents();

            const price = priceText.map(price => Number(price.replace('$', '').trim()));

            const sortedPriceHLo = [...price].sort((a, b) => b - a);

            expect(price).toEqual(sortedPriceHLo);

        } catch (err) {
            await this.capturefailureScreenshot(testInfo, "Sort_option_verify_failure");
            throw err;
        }

    }


    async addProductToCart(productName: string): Promise<void> {
        const product = this.inventoryItem.filter({ hasText: productName });
        await product.getByRole("button", { name: "Add to cart" }).click();
    }

    async verifyCartCount(expectedCount: string, testInfo: TestInfo): Promise<void> {
        try {
            await expect(this.cartBadge).toHaveText(expectedCount);
        } catch (error) {
            await this.capturefailureScreenshot(testInfo, "cart_failure");
            throw error;
        };

    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async verifyProductInCart(productName: string, testInfo: TestInfo): Promise<void> {

        try {
            await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
        }
        catch (error) {
            await this.capturefailureScreenshot(testInfo, "Product_not_found_in_cart");
            throw error;
        };
    }

    async getProductCount(): Promise<number> {

        return await this.page.locator(".inventory_item").count();
    }
}