import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { ProductsPage } from "../page/ProductsPage";

type Fixtures = {
    loginpage: LoginPage;
    productpage: ProductsPage;
}

export const test = base.extend<Fixtures>({

    loginpage: async ({ page }, use) => {
        const loginpage = new LoginPage(page);
        await use(loginpage);
    },

    productpage: async ({ page }, use) => {
        const productPage = new ProductsPage(page);
        await use(productPage);
    }
});

export { expect };