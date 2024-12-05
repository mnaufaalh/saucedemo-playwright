exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async loginFlow(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
};
