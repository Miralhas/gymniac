export * from '@playwright/test';
import { test as base } from '@playwright/test';
import { RegisterPage } from '../features/register/page';
import { LoginPage } from '../features/login/page';
import { HomePage } from '../features/home/page';

type MyFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  registerPage: async ({ page }, yuse) => {
    await yuse(new RegisterPage(page));
  },
  loginPage: async ({ page }, yuse) => {
    await yuse(new LoginPage(page));
  },
  homePage: async ({ page }, yuse) => {
    await yuse(new HomePage(page));
  }
});