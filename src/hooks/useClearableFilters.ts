import { useCallback, useRef } from 'react';
import { useUrlFilters } from './useUrlFilters';

/**
 * "Clear filters" for a list toolbar: whether any of `keys` is set in the URL, and a clear that
 * removes them all in one navigation. The search box is uncontrolled, so pass `searchRef` to it
 * and clearing empties its text too.
 */
export function useClearableFilters(keys: readonly string[]) {
   const { get, setMany } = useUrlFilters();
   const searchRef = useRef<HTMLInputElement>(null);
   const hasActiveFilters = keys.some((key) => get(key));

   const clearFilters = useCallback(() => {
      setMany(Object.fromEntries(keys.map((key) => [key, undefined])));
      if (searchRef.current) searchRef.current.value = '';
   }, [keys, setMany]);

   return { searchRef, hasActiveFilters, clearFilters };
}
