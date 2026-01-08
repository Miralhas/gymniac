import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url()
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});