import { test } from "../fixtures/testFixtures";

test("Login using custom fixture", async ({
    loginpage, productpage
}) => {
    await loginpage.open("/");
    await loginpage.login("standard_user", "secret_sauce");
    await loginpage.verifyLoginSuccess();
    await productpage.verifyProductsPage();
});