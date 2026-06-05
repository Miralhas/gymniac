import { expect, test } from "../../../shared/fixture";
import { adminData } from "../data";
import { RegisterFactory } from "../factory";

test.describe("User registration", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test("registers a new user", async ({ registerPage, page }) => {
    const account = RegisterFactory.newAccount();

    await expect(registerPage.heading).toContainText('Create your account');

    await registerPage.fillForm(account);
    await registerPage.submitForm();

    await expect(page.getByRole('button', { name: 'User profile picture' })).toBeVisible();
  });

  test("prevents registration with an existing email and username", async ({ registerPage }) => {
    const account = RegisterFactory.newAccount(adminData);

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