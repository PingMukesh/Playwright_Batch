import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private usernameInput = this.page.getByPlaceholder("Username");
    private passwordInput = this.page.getByPlaceholder("Password");
    private loginButton = this.page.locator("#login-button");
    private errorMessage = this.page.locator("[data-test='error']");

    constructor(page: Page) {
        super(page);
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async verifyLoginSuccess(): Promise<void> {

        await expect(this.page).toHaveURL(/inventory/);
    }

    async verifyLoginError(expectedMessage: string): Promise<void> {

        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

    async verifyTextVisible(expectedText: string): Promise<void> {

        await expect(this.page.getByText(expectedText, { exact: true })).toBeVisible();
    }
}