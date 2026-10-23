
import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DemoQAPage extends BasePage {

    private fullName = this.page.locator("#userName");
    private submitButton = this.page.locator("#submit");
    private nameOutput = this.page.locator("#name");
    private URL: string = "https://demoqa.com/";
    private newTab!: Page;

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
    // -------Alerts()-------------

    async openAlerts(): Promise<void> {
        await this.page.goto(this.URL + "alerts");
    }

    async handleSimpleAlert(): Promise<void> {
        this.page.once("dialog",
            async dialog => {
                expect(dialog.type()).toBe("alert");
                expect(dialog.message()).toBe("You clicked a button");
                await dialog.accept();
            }
        );

        await this.page.getByRole("button", { name: "Click me", exact: true }).nth(0).click();
    }

    async HandleConfirmAlert(): Promise<void> {
        this.page.once("dialog", async dialog => {
            expect(dialog.type()).toBe("confirm");
            await dialog.accept();
        });

        await this.page.locator("#confirmButton").click();
    }

    async handlePromptAlert(name: string): Promise<void> {
        this.page.once("dialog", async dialog => {
            expect(dialog.type()).toBe("prompt");
            await dialog.accept(name);
        });

        await this.page.locator("#promtButton").click();

    }

    async verifyPromptResult(name: string): Promise<void> {
        const result = await this.page.locator("#promptResult");
        await expect(result).toBeVisible();
        await expect(result).toContainText(name);
    }
    // -------window-------------------
    async openBrowserWindows(): Promise<void> {
        await this.page.goto(this.URL + "browser-windows");
    }

    async openandVerifyNewTab(): Promise<void> {
        const newpagePromise = this.page.context().waitForEvent("page");

        await this.page.getByRole("button", { name: "New Tab", exact: true }).click();

        this.newTab = await newpagePromise;

        await this.newTab.waitForLoadState("domcontentloaded");
    }

    async verifyNewTab(): Promise<void> {
        await expect(this.newTab.locator("#sampleHeading")).toHaveText("This is a sample page");
    }

    // ------frames---------

    async openFrame(): Promise<void> {
        await this.page.goto(this.URL + "frames");
    }

    async VerifyFrametext(): Promise<void> {
        const frameHeading = this.page.frameLocator("#frame1").locator("#sampleHeading");

        await expect(frameHeading).toHaveText("This is a sample page");
    }


    /// ------------- Widgets--------------

    async accordianPage(): Promise<void> {

        await this.page.goto(this.URL + "accordian");
    }

    async expandAccordion(): Promise<void> {

        await this.accordianPage()

        const frist = this.page.getByRole("button", { name: "What is Lorem Ipsum?", exact: true });

        const second = this.page.getByRole("button", { name: "Where does it come from?", exact: true });


        await expect(frist).toHaveAttribute("aria-expanded", "true");

        await second.click();

        await expect(second).toHaveAttribute("aria-expanded", "true");


        const secondContent = this.page.locator(".accordion-item").filter({ has: second }).locator("accordion-collapse");

        await expect(secondContent).toBeVisible();
    }


    /// ------------- Auto Complete--------------


    async selectAutoCompleteFunctions(): Promise<void> {
        await this.page.goto(this.URL + "auto-complete");

        const Singleinput = await this.page.locator("#autoCompleteSingleInput");

        await Singleinput.fill("red");

        const option = this.page.locator(".auto-complete__single-value");
        await expect(option).toHaveText("Red");


        const MultiInput = await this.page.locator("#autoCompleteMultipleInput");

        await MultiInput.fill("green");

        const MultiOption = this.page.locator(".auto-complete__multi-value__label");

        await expect(MultiOption).toHaveText("Green");

    }


    ///-------------Datee Picker-----------

    async datepicker(): Promise<void> {
        await this.page.goto(this.URL + "date-picker");

        const dateInput = await this.page.locator("#datePickerMonthYearInput");

        await dateInput.fill("10/22/2026");

        expect(dateInput).toHaveValue("10/22/2026");
    }

    ////------------- Slider ----------


    async sliderpage(): Promise<void> {
        await this.page.goto(this.URL + "slider")

        const silder = this.page.locator("input[type='range']");

        const before = Number(await silder.inputValue());
        await silder.focus();
        await silder.press("ArrowRight");

        const after = Number(await silder.inputValue());

        expect(after).toBeGreaterThan(before);

    }


    ////------------Progress-Bar---------


    async CompleteProgressbar(): Promise<void> {

        await this.page.goto(this.URL + "progress-bar");

        const startButton = this.page.locator("#startStopButton");
        await startButton.click();

        const progressBar = this.page.locator(".progress-bar");
        await expect(progressBar).toContainText("100", { timeout: 4000 });
    }

    ///--- Tool Tips------


    async showToolTip(): Promise<void> {
        await this.page.goto(this.URL + "tooltip");


        const hoverMeButton = this.page.getByRole("button", { name: "Hover me to see" });
        await hoverMeButton.hover();
        await expect(this.page.locator(".tooltip-inner")).toHaveText("You hovered over the button");
    }



    ///---Sortable-------

    async sortitems(): Promise<void> {

        await this.page.goto(this.URL + "sortable");

        const itmes = this.page.locator("#demo-tabpane-list .list-group-item");

        const before = await itmes.allTextContents();

        await itmes.nth(0).dragTo(itmes.nth(3));

        await expect.poll(async () => { return await itmes.allTextContents(); }).not.toEqual(before);
    }

    ///---Resiziable---


    async resizeBox(): Promise<void> {
        await this.page.goto(this.URL + "resizable");

        const box = this.page.locator("#resizableBoxWithRestriction");

        const beforeSize = await box.boundingBox();

        if (!beforeSize) {
            throw new Error("Box is not found on the UI.");
        }

        const handle = box.locator(".react-resizable-handle");
        const handleBox = await handle.boundingBox();

        if (!handleBox) {
            throw new Error("The Handle is not found on the UI");
        }

        const x = handleBox.x + handleBox.width / 2;
        const y = handleBox.y + handleBox.height / 2;


        await this.page.mouse.move(x, y);

        await this.page.mouse.down();
        await this.page.mouse.move(x + 60, y + 50);
        await this.page.mouse.up();

        const aferSize = await box.boundingBox();

        expect(aferSize).not.toBeNull();
        expect(aferSize!.width).toBeGreaterThan(beforeSize!.width);
    }

    async dropElement(): Promise<void> {
        await this.page.goto(this.URL + "droppable");

        const drag = this.page.locator("#draggable");
        const drop = this.page.locator("#simpleDropContainer #droppable");

        await drag.dragTo(drop);

        await expect(drop).toContainText("Dropped!");

    }

    async DragElement(): Promise<void> {
        await this.page.goto(this.URL + "dragabble");


        const dragbox = this.page.locator("#dragBox");

        const beforeDB = await dragbox.boundingBox();

        if (!beforeDB) {
            throw new Error("Box is not found");
        }

        await this.page.mouse.move(beforeDB.x + beforeDB.width / 2, beforeDB.y + beforeDB.height / 2);

        await this.page.mouse.down();

        await this.page.mouse.move(beforeDB.x + 60, beforeDB.y + 50);
        await this.page.mouse.up();


        const afterDB = dragbox.boundingBox();

        expect(afterDB).not.toBeNull();

        expect(afterDB).toBeGreaterThan(beforeDB.x + 20);
    }

}