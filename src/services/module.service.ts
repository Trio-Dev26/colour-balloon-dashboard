// Module API calls. The only layer that talks to the backend (or, for now, the mock data).
//
// TODO(api): when the NestJS endpoints exist, replace each function body with the axios call in
// its comment, then delete src/mocks/. Hooks and components stay unchanged.
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import { MOCK_MODULES } from '@/mocks/module.mock';
import { buildMockModuleDetail, buildMockUnits } from '@/mocks/moduleDetail.mock';
import type { Paginated } from '@/types/api/pagination.types';
import type { ModuleDetail, ModuleFilters, ModuleListItem, ModuleStatus, UnitSummary } from '@/types/api/module.types';

const MOCK_LATENCY_MS = 300;
const delay = () => new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

// In-memory copy so publish/delete visibly work during development (resets on reload).
let mockModules = [...MOCK_MODULES];
// Saved unit order per module id (unit ids in unlock order).
const mockUnitOrder = new Map<string, string[]>();

function matchesFilters(module: ModuleListItem, { search, level, category, status }: ModuleFilters): boolean {
   const term = search?.trim().toLowerCase();
   const matchesSearch =
      !term || [module.titleEn, module.titleMy, module.code].some((value) => value.toLowerCase().includes(term));
   return (
      matchesSearch &&
      (!level || module.level.id === level) &&
      (!category || module.category.id === category) &&
      (!status || module.status === status)
   );
}

/** (await axiosApi.get<Paginated<ModuleListItem>>('/modules', { params: { ...filters, limit } })).data */
export async function getModules(filters: ModuleFilters): Promise<Paginated<ModuleListItem>> {
   await delay();
   const matching = mockModules.filter((module) => matchesFilters(module, filters));
   const start = (filters.page - 1) * DEFAULT_PAGE_SIZE;
   return {
      data: matching.slice(start, start + DEFAULT_PAGE_SIZE),
      meta: { page: filters.page, limit: DEFAULT_PAGE_SIZE, total: matching.length },
   };
}

/** (await axiosApi.get<ModuleDetail>(`/modules/${id}`)).data — null when the API returns 404. */
export async function getModule(id: string): Promise<ModuleDetail | null> {
   await delay();
   const index = mockModules.findIndex((module) => module.id === id);
   return index === -1 ? null : buildMockModuleDetail(mockModules[index], index);
}

/** (await axiosApi.get<UnitSummary[]>(`/modules/${id}/units`)).data */
export async function getModuleUnits(id: string): Promise<UnitSummary[]> {
   await delay();
   const found = mockModules.find((item) => item.id === id);
   if (!found) return [];
   const units = buildMockUnits(found);
   const order = mockUnitOrder.get(id);
   if (!order) return units;
   return order
      .map((unitId) => units.find((unit) => unit.id === unitId))
      .filter((unit): unit is UnitSummary => Boolean(unit))
      .map((unit, index) => ({ ...unit, order: index + 1 }));
}

/** await axiosApi.put(`/modules/${moduleId}/units/order`, { unitIds }) — FR-CUR-006: the order is the unlock order. */
export async function reorderModuleUnits(moduleId: string, unitIds: string[]): Promise<void> {
   await delay();
   mockUnitOrder.set(moduleId, unitIds);
}

/** await axiosApi.patch(`/modules/${id}/status`, { status }) */
export async function updateModuleStatus(id: string, status: ModuleStatus): Promise<void> {
   await delay();
   mockModules = mockModules.map((module) => (module.id === id ? { ...module, status } : module));
}

/** await axiosApi.delete(`/modules/${id}`) */
export async function deleteModule(id: string): Promise<void> {
   await delay();
   mockModules = mockModules.filter((module) => module.id !== id);
}
