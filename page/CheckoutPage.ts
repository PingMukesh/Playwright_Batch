import {Page, expect} from "@playwright/test";
import {BasePage} from "./BasePage";


export class CheckoutPage extends BasePage {

    private Checkoutbutton = this.page.getByRole("button", {name: "Checkout"});
    private firstNameInput =  this.page.getByPlaceholder("First Name");
    private LastNameInput = this.page.getByPlaceholder("Last Name");
    private postalCode = this.page.getByPlaceholder("Zip/Postal Code");
    private continueBtn = this.page.getByRole("button",{name: "Continue"});
    private finishBtn = this.page.getByRole("button", {name: "Finish"});
    private subTotal = this.page.locator(".summary_subtotal_label");
    private tax = this.page.locator(".summary_tax_label");
    private total = this.page.locator(".summary_total_label");
    private confirmationHeader = this.page.locator(".complete-header");


    async proceedToCheckout():Promise<void> {
        await this.Checkoutbutton.click();
    }

    async enterCheckoutDetails(firstName: string, lastName: string, zipCode: string): Promise<void>{
        await this.firstNameInput.fill(firstName);
        await this.LastNameInput.fill(lastName);
        await this.postalCode.fill(zipCode);
    }

    async continueToOverview(): Promise<void>{
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/checkout-step-two/);
    }

    async verifyProductInOverview(productName: string): Promise<void>{
        await expect(this.page.getByText(productName, {exact: true})).toBeVisible();
    }

    async verifySubtotlatTaxAndTotal():Promise<void>{
        const taxLabelText = await this.tax.textContent();
        const subTotalTaxText = await this.subTotal.textContent();
        const totalText = await this.total.textContent();

       const subTotal =  Number(subTotalTaxText?.match(/[0-9]+\.[0-9]{2}/)?.[0]);
       const tax = Number(taxLabelText?.match(/[0-9]+\.[0-9]{2}/)?.[0]);
       const total = Number(totalText?.match(/[0-9]+\.[0-9]{2}/)?.[0]);

       expect(Number.isFinite(subTotal)).toBeTruthy();
       expect(Number.isFinite(tax)).toBeTruthy();
       expect(Number.isFinite(total)).toBeTruthy();

       const expectedTax = Math.round(subTotal * 0.08 * 100) / 100;
       const expectedTotal = Math.round((subTotal + expectedTax) * 100) / 100;

       expect(tax).toBeCloseTo(expectedTax);
       expect(total).toBeCloseTo(expectedTotal);
    }

    async finishOrder():Promise<void>{
        await this.finishBtn.click();
    }

    async verifyOderConfirmation(expectedMessage:string):Promise<void>{
        await expect(this.confirmationHeader).toHaveText(expectedMessage);
        await expect(this.page).toHaveURL(/checkout-complete/);
    }   

}