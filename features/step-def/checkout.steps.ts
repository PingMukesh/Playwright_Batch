import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";


When ("I open the shopping cart",
    async function (this: CustomWorld){
        await this.productsPage.openCart();
    }
);

Then ("I should see {string} in the shopping cart",
    async function (this: CustomWorld, productName: string){
        await this.productsPage.verifyProductInCart(productName);
    }
);

When ("I click on the checkout button",
    async function (this: CustomWorld){
        await this.checkoutPage.proceedToCheckout();
    }
);

When ("I enter the first name as {string} last name as {string} and zip code as {string}",
    async function (this: CustomWorld, firstName: string, lastName: string, zipCode: string){
        await this.checkoutPage.enterCheckoutDetails(firstName, lastName, zipCode);
    }
);

When ("I click on checkout overview",
    async function (this: CustomWorld){
        await this.checkoutPage.continueToOverview();
    }
);


Then ("I should see the {string} in the checkout overview",
    async function (this:CustomWorld, productName:string) {
        await this.checkoutPage.verifyProductInOverview(productName);        
    }
);


Then ("the subtotal tax and total should be correct",
    async function (this: CustomWorld){
        await this.checkoutPage.verifySubtotlatTaxAndTotal();
    }
);

When ("I click on finish button",
    async function (this: CustomWorld){
        await this.checkoutPage.finishOrder();
    }
);

Then ("I should see the order confirmation {string}",
    async function (this: CustomWorld, expectedMessage:string){
        await this.checkoutPage.verifyOderConfirmation(expectedMessage);
    }
);