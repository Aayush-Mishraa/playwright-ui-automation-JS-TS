const { test, expect } = require('@playwright/test')

test("Child window parent class", async ({ browser }) => {
    const context = await browser.newContext()//this will create a new browser context, which is an isolated environment for the test
    const page = await context.newPage();
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })