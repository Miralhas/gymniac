export * from '@playwright/test';
import { test as base } from '@playwright/test';
import { RegisterPage } from '../features/register/page';

type MyFixtures = {
  registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({
  registerPage: async ({ page }, yuse) => {
    await yuse(new RegisterPage(page));
  },
});