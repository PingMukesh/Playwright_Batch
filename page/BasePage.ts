import { Page, TestInfo } from "@playwright/test";

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string): Promise<void> {
        await this.page.goto(url);
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    getTitle(): Promise<string> {
        return this.page.title();
    }

    async capturefailureScreenshot(testinfo: TestInfo, name: string): Promise<void> {
        const screenshot = await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await testinfo.attach(name, { body: screenshot, contentType: "image/png" });
    }
}