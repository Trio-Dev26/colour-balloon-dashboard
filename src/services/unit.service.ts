// Unit API calls (FR-CUR-004, FR-CUR-006). The only layer that talks to the backend.
import axiosApi, { isMissingRecord } from '@/lib/axios';
import { toPaginated } from '@/lib/pagination';
import { docToHtml, htmlToDoc } from '@/lib/richText';
import { MAX_PAGE_SIZE, UNIT_PATHS } from '@/constants/api';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import type { ApiPage, Paginated } from '@/types/api/pagination.types';
import type { UnitDetail, UnitFilters, UnitListItem, UnitPayload, UnitResponse } from '@/types/api/unit.types';
import { getModule } from './module.service';

const toListItem = (unit: UnitResponse): UnitListItem => ({
   id: unit.id,
   moduleId: unit.moduleId,
   moduleCode: unit.module.code,
   moduleStatus: unit.module.status,
   code: unit.code,
   order: unit.sequence,
   titleEn: unit.titleEn,
   titleMy: unit.titleMy,
   lessonCount: 0, // TODO(api): lessons aren't on the API yet; use the unit's lesson count once they are.
   updatedAt: unit.updatedAt,
});

const toBody = (payload: UnitPayload) => ({
   ...payload,
   descriptionEn: htmlToDoc(payload.descriptionEn),
   descriptionMy: htmlToDoc(payload.descriptionMy),
});

const fetchPage = async (params: UnitFilters & { limit: number }) =>
   (await axiosApi.get<ApiPage<UnitResponse>>(UNIT_PATHS.list, { params })).data;

export async function getUnits(filters: UnitFilters): Promise<Paginated<UnitListItem>> {
   const page = await fetchPage({ ...filters, limit: DEFAULT_PAGE_SIZE });
   return toPaginated({ ...page, items: page.items.map(toListItem) });
}

/** A module's units in unlock order. */
export async function getModuleUnits(moduleId: string): Promise<UnitListItem[]> {
   // ponytail: one page of MAX_PAGE_SIZE; page through if a module ever passes 100 units.
   const page = await fetchPage({ moduleId, page: 1, limit: MAX_PAGE_SIZE });
   return page.items.map(toListItem);
}

/** null when the unit doesn't exist (404) or the id isn't a valid UUID (400). */
export async function getUnit(id: string): Promise<UnitDetail | null> {
   let unit: UnitResponse;
   try {
      unit = (await axiosApi.get<UnitResponse>(UNIT_PATHS.detail(id))).data;
   } catch (error) {
      if (isMissingRecord(error)) return null;
      throw error;
   }
   // The unit response has no level or category; the meta bar shows them, so read them from the module.
   const parent = await getModule(unit.moduleId);
   if (!parent) return null;
   const { code, titleEn, level, category } = parent;
   return {
      ...toListItem(unit),
      descriptionEn: docToHtml(unit.descriptionEn),
      descriptionMy: docToHtml(unit.descriptionMy),
      module: { id: parent.id, code, titleEn, level, category },
   };
}

/** The backend generates the code and puts the unit at the end of its module. */
export async function createUnit(payload: UnitPayload): Promise<UnitListItem> {
   return toListItem((await axiosApi.post<UnitResponse>(UNIT_PATHS.list, toBody(payload))).data);
}

/** A different moduleId moves the unit to the end of that module; its code stays the same. */
export async function updateUnit(id: string, payload: UnitPayload): Promise<void> {
   await axiosApi.patch(UNIT_PATHS.detail(id), toBody(payload));
}

export async function deleteUnit(id: string): Promise<void> {
   await axiosApi.delete(UNIT_PATHS.detail(id));
}

/** unitIds must list every unit of the module once; the order is the unlock order. */
export async function reorderModuleUnits(moduleId: string, unitIds: string[]): Promise<void> {
   await axiosApi.patch(UNIT_PATHS.reorder, { moduleId, unitIds });
}
