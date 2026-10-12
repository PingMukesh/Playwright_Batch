import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private usernameInput = this.page.getByPlaceholder("Username");
    private passwordInput = this.page.getByPlaceholder("Password");
    private loginButton = this.page.getByRole("button", { name: "Login" });
    private errorMessage = this.page.locator("[data-test='error']");

    constructor(page: Page) {
        super(page);
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.usernameInput.type(username);
        await this.passwordInput.type(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccess(): Promise<void> {

        await expect(this.page).toHaveURL(/inventory/);
    }

    async verifyLoginError(): Promise<void> {

        await expect(this.errorMessage).toBeVisible();
    }
}