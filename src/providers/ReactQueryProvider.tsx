'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
   // Create client once per component lifecycle
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  refetchOnMount: true,
                  staleTime: 30000,
                  gcTime: 60000,
                  refetchOnWindowFocus: true,
                  retry: false,
               },
            },
         })
   );
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
