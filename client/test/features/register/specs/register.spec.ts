import { adminData } from "../../../shared/auth/data";
import { expect, test } from "../../../shared/fixture";
import { RegisterFactory } from "../factory";

test.describe("User registration", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test("registers a new user", async ({ registerPage, homePage }) => {
    const account = RegisterFactory.newAccount();

    await expect(registerPage.heading).toContainText('Create your account');

    await registerPage.fillForm(account);
    await registerPage.submitForm();

    await expect(homePage.navbar.userProfileButton).toBeVisible();
  });

  test("prevents registration with an existing email and username", async ({ registerPage }) => {
    const account = RegisterFactory.newAccount({ email: adminData.email, username: adminData.username });

    await expect(registerPage.heading).toContainText('Create your account');

    await registerPage.fillForm(account);
    await registerPage.submitForm();

    await expect(registerPage.errorAlert).toBeVisible();
    await expect(registerPage.form).toContainText(`The email '${account.email}' is already in use.`);
    await expect(registerPage.form).toContainText(`The username '${account.username}' is already in use.`);
  });

  test("prevents registration when passwords do not match", async ({ registerPage }) => {
    const account = RegisterFactory.withDifferentPasswords();

    await expect(registerPage.heading).toContainText('Create your account');

    await registerPage.fillForm(account);
    await registerPage.submitForm();

    await expect(registerPage.form).toContainText("Passwords must be the same");
  });
});