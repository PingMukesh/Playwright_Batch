
import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DemoQAPage extends BasePage {

    private fullName = this.page.locator("#userName");
    private submitButton = this.page.locator("#submit");
    private nameOutput = this.page.locator("#name");
    private URL: string = "https://demoqa.com/";

    constructor(page: Page) {
        super(page);
    }


    async openButtons(): Promise<void> {
        await this.page.goto(this.URL + "buttons");
    }

    async doubleClickButton(): Promise<void> {
        await this.page.getByRole("button", { name: "Double Click Me" }).dblclick();
    }

    async rightClickButton(): Promise<void> {
        await this.page.getByRole("button", { name: "Right Click Me" }).click({ button: "right" });
    }

    async verifyDoubleClickMessage(): Promise<void> {
        await expect(this.page.locator("#doubleClickMessage")).toHaveText("You have done a double click");
    }

    async verifyRightClickMessage(): Promise<void> {
        await expect(this.page.locator("#rightClickMessage")).toHaveText("You have done a right click");
    }

    async openTextBox(): Promise<void> {
        await this.page.goto(this.URL + "text-box");
    }

    async enterFullNameUsingKeyboard(name: string): Promise<void> {
        await this.fullName.click();
        await this.fullName.pressSequentially(name);
    }

    async selectAllAndReplaceName(name: string): Promise<void> {
        await this.fullName.press("Control+A");
        await this.fullName.pressSequentially(name);
    }

    async submitTextBox(): Promise<void> {
        await this.submitButton.click();
    }

    async verifySubmittedName(name: string): Promise<void> {
        await expect(this.nameOutput).toContainText(name);
    }

}