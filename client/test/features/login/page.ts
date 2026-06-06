import { LoginInput } from "@/lib/schemas/login-schema";
import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;

    this.form = page.locator('#login-form');
    
    this.heading = page.getByRole('heading');
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.getByText('Error Logging In');
  }

  public async goto() {
    await this.page.goto('/login');
  }

  public async fillForm(input: LoginInput): Promise<void> {
    await this.emailInput.fill(input.email);
    await this.passwordInput.fill(input.password);
  }

  public async submitForm() {
    await this.loginButton.click();
  }

}