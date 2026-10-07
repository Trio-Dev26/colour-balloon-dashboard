// TEMPORARY in-memory "database" shared by the mock services, so changes made in one screen
// (e.g. creating a unit) show up everywhere until the page is reloaded. Delete src/mocks when
// the NestJS API is bound.
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import type { Paginated } from '@/types/api/pagination.types';
import { buildMockLessons } from './lesson.mock';
import { MOCK_MODULES } from './module.mock';
import { buildMockUnits } from './unit.mock';

const MOCK_LATENCY_MS = 300;

const modules = [...MOCK_MODULES];
const units = buildMockUnits(modules);
const lessons = buildMockLessons(units);

export const mockDb = { modules, units, lessons };

/** Simulates network latency so loading states are visible. */
export const mockDelay = () => new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

/** Unique id for records created in the browser. */
export const mockId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

/** Server-side style paging over an in-memory list. */
export function mockPaginate<T>(items: T[], page: number): Paginated<T> {
   const start = (page - 1) * DEFAULT_PAGE_SIZE;
   return {
      data: items.slice(start, start + DEFAULT_PAGE_SIZE),
      meta: { page, limit: DEFAULT_PAGE_SIZE, total: items.length },
   };
}

/** Case-insensitive "any of these fields contains the search term". */
export const mockMatches = (search: string | undefined, fields: string[]) => {
   const term = search?.trim().toLowerCase();
   return !term || fields.some((value) => value.toLowerCase().includes(term));
};
