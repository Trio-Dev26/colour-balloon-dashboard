// Module API calls (FR-CUR-001, FR-CUR-002). The only layer that talks to the backend.
import axiosApi, { isMissingRecord } from '@/lib/axios';
import { toPaginated } from '@/lib/pagination';
import { docToHtml, htmlToDoc } from '@/lib/richText';
import { MAX_PAGE_SIZE, MODULE_PATHS } from '@/constants/api';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import { MODULE_IMAGE } from '@/constants/module';
import type {
   ModuleDetail,
   ModuleFilters,
   ModuleListItem,
   ModuleOption,
   ModulePayload,
   ModuleResponse,
   ModuleStatus,
} from '@/types/api/module.types';
import type { ApiPage, Paginated } from '@/types/api/pagination.types';

const toDetail = (module: ModuleResponse): ModuleDetail => ({
   ...module,
   descriptionEn: docToHtml(module.descriptionEn),
   descriptionMy: docToHtml(module.descriptionMy),
   learningOutcomeEn: docToHtml(module.learningOutcomeEn),
   learningOutcomeMy: docToHtml(module.learningOutcomeMy),
});

const toBody = (payload: ModulePayload) => ({
   ...payload,
   descriptionEn: htmlToDoc(payload.descriptionEn),
   descriptionMy: htmlToDoc(payload.descriptionMy),
   learningOutcomeEn: htmlToDoc(payload.learningOutcomeEn),
   learningOutcomeMy: htmlToDoc(payload.learningOutcomeMy),
});

export async function getModules(filters: ModuleFilters): Promise<Paginated<ModuleListItem>> {
   const { data } = await axiosApi.get<ApiPage<ModuleResponse>>(MODULE_PATHS.list, {
      params: { ...filters, limit: DEFAULT_PAGE_SIZE },
   });
   return toPaginated(data);
}

// ponytail: first MAX_PAGE_SIZE modules only; switch the picker to search once there are more than 100.
export async function getModuleOptions(): Promise<ModuleOption[]> {
   const { data } = await axiosApi.get<ApiPage<ModuleResponse>>(MODULE_PATHS.list, {
      params: { page: 1, limit: MAX_PAGE_SIZE },
   });
   return data.items.map(({ id, code, titleEn, status }) => ({ id, code, titleEn, status }));
}

/** Up to MAX_PAGE_SIZE modules and the overall total (dashboard). */
export async function getModuleSample(): Promise<{ items: ModuleListItem[]; total: number }> {
   const { data } = await axiosApi.get<ApiPage<ModuleResponse>>(MODULE_PATHS.list, {
      params: { page: 1, limit: MAX_PAGE_SIZE },
   });
   return { items: data.items, total: data.total };
}

/** null when the module doesn't exist (404) or the id isn't a valid UUID (400). */
export async function getModule(id: string): Promise<ModuleDetail | null> {
   try {
      return toDetail((await axiosApi.get<ModuleResponse>(MODULE_PATHS.detail(id))).data);
   } catch (error) {
      if (isMissingRecord(error)) return null;
      throw error;
   }
}

export async function createModule(payload: ModulePayload): Promise<ModuleDetail> {
   return toDetail((await axiosApi.post<ModuleResponse>(MODULE_PATHS.list, toBody(payload))).data);
}

export async function updateModule(id: string, payload: ModulePayload): Promise<ModuleDetail> {
   return toDetail((await axiosApi.patch<ModuleResponse>(MODULE_PATHS.detail(id), toBody(payload))).data);
}

export async function updateModuleStatus(id: string, status: ModuleStatus): Promise<ModuleDetail> {
   return toDetail((await axiosApi.patch<ModuleResponse>(MODULE_PATHS.status(id), { status })).data);
}

/** 409 once the module has been published (D18). */
export async function deleteModule(id: string): Promise<void> {
   await axiosApi.delete(MODULE_PATHS.detail(id));
}

/** JPG or PNG up to 20 MB (FR-CUR-002); replaces any existing thumbnail. */
export async function uploadModuleThumbnail(id: string, file: File): Promise<ModuleDetail> {
   const body = new FormData();
   body.append(MODULE_IMAGE.uploadField, file);
   return toDetail((await axiosApi.put<ModuleResponse>(MODULE_PATHS.thumbnail(id), body)).data);
}

export async function removeModuleThumbnail(id: string): Promise<ModuleDetail> {
   return toDetail((await axiosApi.delete<ModuleResponse>(MODULE_PATHS.thumbnail(id))).data);
}
