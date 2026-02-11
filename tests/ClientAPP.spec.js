const { test, expect } = require('@playwright/test');

test("Login into ", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client")

    const username = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginButton = page.locator("#login")

    await username.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await loginButton.click();
    await page.waitForLoadState('networkidle');//this method waits for the network to be idle, which means that there are no more network requests being made. This is useful to ensure that the page has fully loaded before proceeding with the test.


    // await page.locator(".card-body b").first().waitFor();
    // console.log(page.locator(".card-body b").first());
    console.log(await page.locator(".card-body b").allTextContents());

  console.log(await page.locator(".card-body b").allTextContents());







})