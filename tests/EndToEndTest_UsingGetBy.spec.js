// ============================================
// End-to-End Test using Playwright GetBy Locators
// Purpose: Test complete shopping flow (login → add product → checkout → order)
// This test demonstrates using modern getBy methods instead of CSS/XPath selectors
// ============================================

const { test, expect } = require('@playwright/test');

test("Login into new Applcation", async ({ page }) => {
    // ===== SETUP & PAGE NAVIGATION =====
    // Navigate to the application URL
    await page.goto("https://rahulshettyacademy.com/client")
    
    // Define test data
    const email = "anshika@gmail.com"
    const productName = "ZARA COAT 3";
    
    // ===== LOCATOR DEFINITIONS using GetBy methods (recommended over CSS/XPath) =====
    // getByPlaceholder: Locates element by its placeholder attribute
    const username = page.getByPlaceholder("email@example.com")
    const password = page.getByPlaceholder("enter your passsword")
    
    // getByRole: Locates element by accessibility role (more reliable than CSS selectors)
    const loginButton = page.getByRole("button", { name: "Login" })
    
    // locator: Used for complex selectors that getBy methods don't cover
    const products = page.locator(".card-body")
    
    // LOGIN SECTION - Using getBy methods for better readability and maintainability
    // ===== LOGIN SECTION =====
    // Fill email field
    await username.fill("anshika@gmail.com");
    // Fill password field
    await password.fill("Iamking@000");
    // Click login button
    await loginButton.click();

    // ===== WAIT FOR PAGE LOAD =====
    // Wait for product cards to load (using first element as indicator)
    // This ensures page is fully loaded before proceeding with interaction
    await page.locator(".card-body b").first().waitFor();
    
    // Log total number of products available for debugging
    console.log(await products.count())
    
    // ===== ADD PRODUCT TO CART =====
    // filter(): Finds product card containing the specified text
    // getByRole(): Locates "Add To Cart" button within that product card using accessibility role
    // This approach is more efficient than looping through all products
    await products.filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" }).click();
    
    // ===== NAVIGATE TO CART =====
    // Click on Cart button using accessibility role (getByRole is more reliable than CSS selectors)
    // getByRole("listitem") gets the navbar item, then finds the button with name "Cart"
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    
    // Wait for cart items to load
    await page.locator("div li").first().waitFor();
    
    // ===== ASSERTION: Verify product in cart =====
    // Assert that the product is visible in the cart before proceeding
    await expect(page.getByText(productName)).toBeVisible()

    // ===== CHECKOUT SECTION =====
    // Click Checkout button using accessibility role
    await page.getByRole("button", { name: "Checkout" }).click();
    
    // Alternative checkout click (fallback - using text locator)
    // Kept as backup in case accessibility role method fails

    // ===== COUNTRY SELECTION =====
    // Type country name in dropdown using pressSequentially (types character by character)
    // { delay: 150 } = 150ms delay between each keystroke for better stability
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    // ===== SELECT COUNTRY FROM DROPDOWN =====
    // Click "India" option from the dropdown
    // nth(1) selects the second button (0-indexed) in case there are multiple matches
    await page.getByRole("button", { name: "India" }).nth(1).click();

    // ===== PLACE ORDER =====
    // Click the "Place Order" button to finalize the purchase
    await page.getByText("Place Order").click();

    // ===== FINAL ASSERTION: Order Confirmation =====
    // Verify success message appears after order placement
    // This confirms the order was successfully created
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible()

})