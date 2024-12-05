const { test, expect } = require('@playwright/test');
const { LoginPage } = require('@pom/login_page/loginPage');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.describe('Login', () => {
  test('should able to login with correct username and password', async ({
    page
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill('standard_user');
    await loginPage.passwordField.fill('secret_sauce');
    await loginPage.loginButton.click();
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });

  test('should unable to login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill('invalid_user');
    await loginPage.passwordField.fill('secret_sauce');
    await loginPage.loginButton.click();
    expect(loginPage.errorMessage).toBeVisible();
  });

  test('should unable to login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill('standard_user');
    await loginPage.passwordField.fill('invalid_pass');
    await loginPage.loginButton.click();
    expect(loginPage.errorMessage).toBeVisible();
  });

  test('should unable to login without username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.passwordField.fill('invalid_pass');
    await loginPage.loginButton.click();
    expect(loginPage.errorMessage).toBeVisible();
  });

  test('should unable to login without password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill('standard_user');
    await loginPage.loginButton.click();
    expect(loginPage.errorMessage).toBeVisible();
  });
});
