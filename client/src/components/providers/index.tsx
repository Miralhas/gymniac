import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

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
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers;
