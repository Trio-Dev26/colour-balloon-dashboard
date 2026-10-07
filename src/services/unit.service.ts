// Unit API calls (FR-CUR-004, FR-CUR-006). Mock-backed until the NestJS unit endpoints exist.
//
// TODO(api): replace each function body with the axios call in its comment, then delete src/mocks/.
import { mockDb, mockDelay, mockId, mockMatches, mockPaginate } from '@/mocks/db.mock';
import type { MockUnitRecord } from '@/mocks/unit.mock';
import type { Paginated } from '@/types/api/pagination.types';
import type { UnitDetail, UnitFilters, UnitListItem, UnitPayload } from '@/types/api/unit.types';

function toListItem(unit: MockUnitRecord): UnitListItem {
   return {
      id: unit.id,
      moduleId: unit.moduleId,
      moduleCode: mockDb.modules.find((module) => module.id === unit.moduleId)?.code ?? '',
      code: unit.code,
      order: unit.order,
      titleEn: unit.titleEn,
      titleMy: unit.titleMy,
      lessonCount: mockDb.lessons.filter((lesson) => lesson.unitId === unit.id).length,
      updatedAt: unit.updatedAt,
   };
}

const byNewest = (a: MockUnitRecord, b: MockUnitRecord) => b.updatedAt.localeCompare(a.updatedAt);

/** (await axiosApi.get<Paginated<UnitListItem>>('/units', { params: { ...filters, limit } })).data */
export async function getUnits(filters: UnitFilters): Promise<Paginated<UnitListItem>> {
   await mockDelay();
   const matching = mockDb.units
      .filter((unit) => !filters.moduleId || unit.moduleId === filters.moduleId)
      .filter((unit) => mockMatches(filters.search, [unit.titleEn, unit.titleMy, unit.code]))
      .sort(byNewest)
      .map(toListItem);
   return mockPaginate(matching, filters.page);
}

/** (await axiosApi.get<UnitListItem[]>(`/modules/${moduleId}/units`)).data — in unlock order. */
export async function getModuleUnits(moduleId: string): Promise<UnitListItem[]> {
   await mockDelay();
   return mockDb.units
      .filter((unit) => unit.moduleId === moduleId)
      .sort((a, b) => a.order - b.order)
      .map(toListItem);
}

/** (await axiosApi.get<UnitDetail>(`/units/${id}`)).data — null when the API returns 404. */
export async function getUnit(id: string): Promise<UnitDetail | null> {
   await mockDelay();
   const unit = mockDb.units.find((item) => item.id === id);
   const parent = unit && mockDb.modules.find((module) => module.id === unit.moduleId);
   if (!unit || !parent) return null;
   const { code, titleEn, level, category } = parent;
   return {
      ...toListItem(unit),
      descriptionEn: unit.descriptionEn,
      descriptionMy: unit.descriptionMy,
      module: { id: parent.id, code, titleEn, level, category },
   };
}

/** (await axiosApi.post<UnitListItem>('/units', payload)).data — the backend generates the code (A-05). */
export async function createUnit(payload: UnitPayload): Promise<UnitListItem> {
   await mockDelay();
   const siblings = mockDb.units.filter((unit) => unit.moduleId === payload.moduleId);
   const record: MockUnitRecord = {
      ...payload,
      id: mockId('unit'),
      code: `U${siblings.length + 1}`,
      order: siblings.length + 1, // new units go to the end of the unlock order (A-15)
      updatedAt: new Date().toISOString(),
   };
   mockDb.units = [...mockDb.units, record];
   return toListItem(record);
}

/** await axiosApi.patch(`/units/${id}`, payload) */
export async function updateUnit(id: string, payload: UnitPayload): Promise<void> {
   await mockDelay();
   mockDb.units = mockDb.units.map((unit) =>
      unit.id === id ? { ...unit, ...payload, updatedAt: new Date().toISOString() } : unit
   );
}

/** await axiosApi.delete(`/units/${id}`) */
export async function deleteUnit(id: string): Promise<void> {
   await mockDelay();
   mockDb.units = mockDb.units.filter((unit) => unit.id !== id);
   mockDb.lessons = mockDb.lessons.filter((lesson) => lesson.unitId !== id);
}

/** await axiosApi.put(`/modules/${moduleId}/units/order`, { unitIds }) — the order is the unlock order. */
export async function reorderModuleUnits(moduleId: string, unitIds: string[]): Promise<void> {
   await mockDelay();
   mockDb.units = mockDb.units.map((unit) =>
      unit.moduleId === moduleId ? { ...unit, order: unitIds.indexOf(unit.id) + 1 } : unit
   );
}
