import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given("I am on the Saucedemo login page", async function (this: CustomWorld): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/");    
});

When("I enter the username as {string}", 
    async function (this: CustomWorld, username: string) {
    await this.loginPage.enterUsername(username);
});

When("I enter the password as {string}", 
    async function (this: CustomWorld, password: string) {
    await this.loginPage.enterPassword(password);
});

When("I click on the login button", 
    async function (this: CustomWorld){
    await this.loginPage.clickLogin();
});

Then("I should be redirected to the product page", async function (this: CustomWorld) {
    await this.loginPage.verifyLoginSuccess();
});

Then("I should see the text {string} on the page", async function (this: CustomWorld, expectedText: string): Promise<void> { 
    await this.loginPage.verifyTextVisible(expectedText);
});