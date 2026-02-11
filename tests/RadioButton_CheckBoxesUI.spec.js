const { test, expect } = require("@playwright/test")
test("Radio Buttons, checkboxes, asserstion examples for UI TEST", async ({ page }) => {

    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const radioButton = page.locator(".radiotextsty");
    const dropdown = page.locator("select.form-control");
    const termsCheckBox = page.locator("#terms");
    const popup = page.locator("#okayBtn");
    const blinkingLink = page.locator("[href*='documents-request']");


    await dropdown.selectOption("teach")

    const userRadioButton = await radioButton.nth(1).click()
    await popup.click()


    console.log(await radioButton.nth(1).isChecked());
    console.log(await radioButton.nth(0).isChecked());
    // expect(await radioButton.nth(0)).toBeDisabled();

    await termsCheckBox.click();

    await expect( termsCheckBox).toBeChecked();

   await expect(blinkingLink).toHaveAttribute("class","blinkingText");


    await page.pause()

})

