'use client'

import { PropsWithChildren } from "react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { AuthProvider } from "@/contexts/auth-context";
import { GlobalLoginProvider } from "@/contexts/global-login-context";
import {
  isServer,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

// SSR Documentation: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <AuthProvider>
          <GlobalLoginProvider>
            {children}
          </GlobalLoginProvider>
        </AuthProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

export default Providers;
