import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_PAGE } from '@/constants/common';

const PAGE_KEY = 'page';

/**
 * List filters and page number stored in the URL (?search=&status=&page=), so back/forward
 * and shared links keep the same view. Changing any filter resets to page 1.
 */
export function useUrlFilters() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   const get = useCallback((key: string) => searchParams.get(key) ?? undefined, [searchParams]);

   const set = useCallback(
      (key: string, value: string | number | undefined) => {
         const params = new URLSearchParams(searchParams);
         if (value === undefined || value === '') params.delete(key);
         else params.set(key, String(value));
         if (key !== PAGE_KEY) params.delete(PAGE_KEY);
         const query = params.toString();
         router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      },
      [searchParams, router, pathname]
   );

   const page = Number(get(PAGE_KEY) ?? DEFAULT_PAGE);
   const setPage = useCallback((next: number) => set(PAGE_KEY, next), [set]);

   return { get, set, page, setPage };
}
