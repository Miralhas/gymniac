import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_URL: z.url(),
    PUBLIC_KEY: z.string()
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url()
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});