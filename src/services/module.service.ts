// Module API calls. The only layer that talks to the backend (or, for now, the mock data).
//
// TODO(api): when the NestJS endpoints exist, replace each function body with the axios call in
// its comment, then delete src/mocks/. Hooks and components stay unchanged.
import { mockDb, mockDelay, mockMatches, mockPaginate } from '@/mocks/db.mock';
import { buildMockModuleDetail } from '@/mocks/moduleDetail.mock';
import type { ModuleDetail, ModuleFilters, ModuleListItem, ModuleOption, ModuleStatus } from '@/types/api/module.types';
import type { Paginated } from '@/types/api/pagination.types';

// The unit count always reflects the current units, as the API would compute it.
const withUnitCount = (module: ModuleListItem): ModuleListItem => ({
   ...module,
   unitCount: mockDb.units.filter((unit) => unit.moduleId === module.id).length,
});

function matchesFilters(module: ModuleListItem, { search, level, category, status }: ModuleFilters): boolean {
   return (
      mockMatches(search, [module.titleEn, module.titleMy, module.code]) &&
      (!level || module.level.id === level) &&
      (!category || module.category.id === category) &&
      (!status || module.status === status)
   );
}

/** (await axiosApi.get<Paginated<ModuleListItem>>('/modules', { params: { ...filters, limit } })).data */
export async function getModules(filters: ModuleFilters): Promise<Paginated<ModuleListItem>> {
   await mockDelay();
   const matching = mockDb.modules.filter((module) => matchesFilters(module, filters)).map(withUnitCount);
   return mockPaginate(matching, filters.page);
}

/** (await axiosApi.get<ModuleOption[]>('/modules/options')).data — every module, for pickers. */
export async function getModuleOptions(): Promise<ModuleOption[]> {
   await mockDelay();
   return mockDb.modules.map(({ id, code, titleEn }) => ({ id, code, titleEn }));
}

/** (await axiosApi.get<ModuleDetail>(`/modules/${id}`)).data — null when the API returns 404. */
export async function getModule(id: string): Promise<ModuleDetail | null> {
   await mockDelay();
   const index = mockDb.modules.findIndex((module) => module.id === id);
   return index === -1 ? null : buildMockModuleDetail(withUnitCount(mockDb.modules[index]), index);
}

/** await axiosApi.patch(`/modules/${id}/status`, { status }) */
export async function updateModuleStatus(id: string, status: ModuleStatus): Promise<void> {
   await mockDelay();
   mockDb.modules = mockDb.modules.map((module) => (module.id === id ? { ...module, status } : module));
}

/** await axiosApi.delete(`/modules/${id}`) */
export async function deleteModule(id: string): Promise<void> {
   await mockDelay();
   mockDb.modules = mockDb.modules.filter((module) => module.id !== id);
   mockDb.units = mockDb.units.filter((unit) => unit.moduleId !== id);
}
