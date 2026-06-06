import { adminData, userData } from "../../../shared/auth/data";
import { expect, test } from "../../../shared/fixture";

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("login as admin", async ({ loginPage, homePage }) => {
    await expect(loginPage.heading).toContainText('Sign In');

    await loginPage.fillForm(adminData);
    await loginPage.submitForm();

    await expect(homePage.navbar.userProfileButton).toBeVisible();
  });

  test("login as user", async ({ loginPage, homePage }) => {
    await expect(loginPage.heading).toContainText('Sign In');

    await loginPage.fillForm(userData);
    await loginPage.submitForm();

    await expect(homePage.navbar.userProfileButton).toBeVisible();
  });

  test("prevents login with wrong credentials", async ({ loginPage }) => {
    await expect(loginPage.heading).toContainText('Sign In');

    await loginPage.fillForm({ ...adminData, password: "4321" });
    await loginPage.submitForm();

    await expect(loginPage.errorAlert).toBeVisible();
  });
});