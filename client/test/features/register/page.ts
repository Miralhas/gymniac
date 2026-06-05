import { SignUpInput } from "@/lib/schemas/signup-schema";
import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly errorAlert: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading');
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
    this.registerButton = page.getByRole('button', { name: 'Sign in' });
    this.errorAlert = page.getByText('Error Logging In');
    this.form = page.locator('#signup-form');
  }

  public async goto() {
    await this.page.goto('/signup');
  }

  public async fillForm(input: SignUpInput): Promise<void> {
    await this.emailInput.fill(input.email);
    await this.usernameInput.fill(input.username);
    await this.passwordInput.fill(input.password);
    await this.confirmPasswordInput.fill(input.confirmPassword);
  }

  public async submitForm() {
    await this.registerButton.click();
  }

}