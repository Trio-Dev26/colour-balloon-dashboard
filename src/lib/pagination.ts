import type { ApiPage, Paginated } from '@/types/api/pagination.types';

export type PageItem = number | 'ellipsis';

export const toPaginated = <T>({ items, page, limit, total }: ApiPage<T>): Paginated<T> => ({
   data: items,
   meta: { page, limit, total },
});

const LEADING_PAGES = 4;

/**
 * Page buttons in the Figma style: first pages, an ellipsis, then the last page.
 * e.g. page 1 of 10 → [1, 2, 3, 4, '…', 10]; page 6 of 10 → [1, '…', 5, 6, 7, '…', 10].
 */
export function getPageItems(page: number, pageCount: number): PageItem[] {
   if (pageCount <= LEADING_PAGES + 2) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
   }
   if (page < LEADING_PAGES) {
      return [...Array.from({ length: LEADING_PAGES }, (_, i) => i + 1), 'ellipsis', pageCount];
   }
   if (page > pageCount - LEADING_PAGES + 1) {
      return [1, 'ellipsis', ...Array.from({ length: LEADING_PAGES }, (_, i) => pageCount - LEADING_PAGES + 1 + i)];
   }
   return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', pageCount];
}
