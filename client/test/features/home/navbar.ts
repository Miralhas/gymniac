import { Locator, Page } from "@playwright/test";

export class Navbar {
  readonly page: Page;

  readonly homeLink: Locator;
  readonly workoutPlansLink: Locator;
  readonly exercisesLink: Locator;
  readonly loginLink: Locator;
  readonly userProfileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'GYMNIAC' });
    this.workoutPlansLink = page.getByRole('link', { name: 'Workout Plans' });
    this.exercisesLink = page.getByRole('link', { name: 'Exercises' });
    this.loginLink = page.getByRole('button', { name: 'Login' });
    this.userProfileButton = page.getByRole('button', { name: 'User profile picture' });
  }

  public async clickLoginLink() {
    await this.loginLink.click();
  }

  public async clickWorkoutPlansLink() {
    await this.workoutPlansLink.click();
  }

  public async clickExercisesLink() {
    await this.exercisesLink.click();
  }
}