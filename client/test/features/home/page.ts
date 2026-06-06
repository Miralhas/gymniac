import { Locator, Page } from "@playwright/test";
import { Navbar } from "./navbar";

export class HomePage {
  readonly page: Page;

  readonly addWorkoutButton: Locator;
  readonly resetCalendarButton: Locator;
  readonly navbar: Navbar;

  constructor(page: Page) {
    this.page = page;

    this.addWorkoutButton = page.getByRole('link', { name: 'Add Workout', exact: true });
    this.resetCalendarButton = page.getByRole('button', { name: 'Reset calendar to current' });
    this.navbar = new Navbar(page);
  }

  public async goto() {
    await this.page.goto('/');
  }

}