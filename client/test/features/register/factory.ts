import { SignUpInput } from "@/lib/schemas/signup-schema";
import { faker } from "@faker-js/faker";

export class RegisterFactory {
  private static baseAccount(): SignUpInput {
    const password = faker.internet.password();
    return {
      email: faker.internet.email(),
      username: faker.string.alphanumeric({ length: 9 }),
      password,
      confirmPassword: password,
    }
  }

  public static newAccount(input?: Partial<SignUpInput>): SignUpInput {
    return {
      ...this.baseAccount(),
      ...input
    }
  }

  public static withDifferentPasswords(input?: Partial<SignUpInput>): SignUpInput {
    return {
      ...this.baseAccount(),
      password: faker.internet.password(),
      confirmPassword: faker.internet.password(),
      ...input,
    }
  }
}