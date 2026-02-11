// const{test, expect} = require('@playwright/test');
// import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
test("Playwright Special locators", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/")

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("password").fill("NewAayush@33")
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText(" The Form has been submitted successfully!.").isVisible();


    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    await page.pause();
})