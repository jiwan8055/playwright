import { test, expect } from '@playwright/test';

  test('Locators', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.click('//a[@id="login2"]');

    await page.isDisabled("(//*[text()='Log in'])[1]");

    await page.locator('//input[@id="loginusername"]').fill("12abc");

    await page.locator('//input[@id="loginpassword"]').fill("test@123");

    await page.click('//*[@onclick="logIn()"]');

    //const logoutLink = await page.locator('//*[@id="logout2"]');

    //await expect (logoutLink).toBeVisible();

    await page.click('(//*[@class="card-img-top img-fluid"])[1]');

    const addToCart = await page.locator('//*[@onclick="addToCart(1)"]');

    await expect (addToCart).toBeVisible();

    await page.click('//*[@onclick="addToCart(1)"]');

    page.on('dialog',dialog => dialog.accept());

    await page.close();







  
  })
