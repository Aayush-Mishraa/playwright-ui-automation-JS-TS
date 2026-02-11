const { test, expect } = require('@playwright/test');

test.only("Login into new Applcation", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    const email = "anshika@gmail.com"
    const productName = "ZARA COAT 3";
    const username = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginButton = page.locator("#login")
    const products = page.locator(".card-body")

    await username.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await loginButton.click();
    // await page.waitForLoadState('networkidle');//this method waits for the network to be idle, which means that there are no more network requests being made. This is useful to ensure that the page has fully loaded before proceeding with the test.
    await page.locator(".card-body b").first().waitFor();

    console.log(await products.count())

    for (let i = 0; i < await products.count(); i++) {

        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator('[routerlink*="cart"]').click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator(`h3:has-text('${productName}')`).isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
//    await page.locator("[placeholder*= 'country']").waitFor();

await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const OptionCount = dropdown.locator("button").count();


    for (let i = 0; i < await OptionCount; i++) {
       const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            ///two other wau text.trim()==="India"//text.inculdes("India")
            await dropdown.locator("button").nth(i).click();

            break;
        }

    }
    await expect( page.locator(".user__name  [type='text']").first()).toHaveText(email)//this is assertion to check if the email is correct or not
    await page.locator(".action__submit").click();
    await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");//this is assertion to check if the order is placed or not
   
   const oderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    await page.locator(".em-spacer-1 .ng-star-inserted").textContent().then((text) => {
    console.log(text)})//this is to get the order id and print it in the console

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    let foundOrder = false;
    for (let i = 0; i < await rows.count(); i++) {
        const rowoderID = await rows.nth(i).locator("th").textContent();
        if (rowoderID && oderID.includes(rowoderID.trim())) {
            await rows.nth(i).locator("button").first().click();
            foundOrder = true;
            break;
        }
    }
    expect(foundOrder).toBeTruthy();
    const orderDetail = page.locator(".col-text").first();
    await orderDetail.waitFor();
    
    const oderDetailID = await orderDetail.textContent();
    expect(oderID.includes(oderDetailID)).toBeTruthy();

});
