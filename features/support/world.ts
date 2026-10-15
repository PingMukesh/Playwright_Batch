import { setWorldConstructor, World, } from "@cucumber/cucumber";
import { LoginPage } from "../../page/LoginPage";
import { ProductsPage } from "../../page/ProductsPage";
import { Browser, Page } from "@playwright/test";
import { CheckoutPage } from "../../page/CheckoutPage";


export class CustomWorld extends World{
    browser!: Browser;
    page!: Page;
    loginPage!: LoginPage;
    productsPage!: ProductsPage; 
    checkoutPage!: CheckoutPage;   
}
setWorldConstructor(CustomWorld);
