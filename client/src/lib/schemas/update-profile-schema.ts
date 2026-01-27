import { EMPTY_DEFAULT_SELECT } from "@/utils/constants";
import * as z from "zod/v3";

const USERNAME_REGEX = /^[a-zA-Z0-9_]*$/

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long"
    })
    .max(20, {
      message: "Username cannot be more than 20 characters long"
    })
    .regex(USERNAME_REGEX, {
      message: "Usernames may only contain letters, numbers, and underscores. Please choose a valid username"
    })
    .optional()
    .or(z.literal('')).transform(val => val === "" ? undefined : val),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long",
    })
    .optional()
    .or(z.literal('')).transform(val => val === "" ? undefined : val),
  confirmPassword: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long",
    })
    .optional()
    .or(z.literal('')).transform(val => val === "" ? undefined : val),
  mode: z.string({ message: "Must be a valid Diet Mode" })
    .optional()
    .or(z.literal(EMPTY_DEFAULT_SELECT)).transform(val => val === EMPTY_DEFAULT_SELECT ? undefined : val),
  weightGoal: z.number({ message: "Weight must be a number" }).positive({ message: "Weight must be a positive number" })
    .optional()
    .or(z.literal(0)).transform(val => val === 0 ? undefined : val),
})
  .refine(value => value.password === value.confirmPassword, {
    message: "Passwords must be the same",
    path: ["confirmPassword"]
  });
export type UpdateUserInput = z.infer<typeof updateUserSchema>;