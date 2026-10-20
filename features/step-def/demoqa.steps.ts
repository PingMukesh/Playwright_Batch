import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given(
    "I open the DemoQA buttons page",
    async function (this: CustomWorld) {
        await this.demoQAPage.openButtons();
    }
);

When(
    "I double-click the button",
    async function (this: CustomWorld) {
        await this.demoQAPage.doubleClickButton();
    }
);

Then(
    "the double-click message should be displayed",
    async function (this: CustomWorld) {
        await this.demoQAPage.verifyDoubleClickMessage();
    }
);

When(
    "I right-click the button",
    async function (this: CustomWorld) {
        await this.demoQAPage.rightClickButton();
    }
);

Then(
    "the right-click message should be displayed",
    async function (this: CustomWorld) {
        await this.demoQAPage.verifyRightClickMessage();
    }
);

Given(
    "I open the DemoQA text box page",
    async function (this: CustomWorld) {
        await this.demoQAPage.openTextBox();
    }
);

When(
    "I enter {string} using the keyboard",
    async function (this: CustomWorld, name: string) {
        await this.demoQAPage.enterFullNameUsingKeyboard(name);
    }
);

When(
    "I replace the name with {string}",
    async function (this: CustomWorld, name: string) {
        await this.demoQAPage.selectAllAndReplaceName(name);
    }
);

When(
    "I submit the text box",
    async function (this: CustomWorld) {
        await this.demoQAPage.submitTextBox();
    }
);

Then(
    "the submitted name should be {string}",
    async function (this: CustomWorld, name: string) {
        await this.demoQAPage.verifySubmittedName(name);
    }
);