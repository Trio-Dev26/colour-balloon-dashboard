// Module API calls (FR-CUR-001, FR-CUR-002). The only layer that talks to the backend.
import { HttpStatusCode, isAxiosError } from 'axios';
import axiosApi from '@/lib/axios';
import { docToHtml, htmlToDoc } from '@/lib/richText';
import { MODULE_PATHS } from '@/constants/api';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import { mockDb, mockDelay } from '@/mocks/db.mock';
import type {
   ModuleDetail,
   ModuleFilters,
   ModuleListItem,
   ModuleOption,
   ModulePage,
   ModulePayload,
   ModuleResponse,
   ModuleStatus,
} from '@/types/api/module.types';
import type { Paginated } from '@/types/api/pagination.types';

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
   const { data } = await axiosApi.get<ModulePage>(MODULE_PATHS.list, {
      params: { ...filters, limit: DEFAULT_PAGE_SIZE },
   });
   return { data: data.items, meta: { page: data.page, limit: data.limit, total: data.total } };
}

// TODO(api): mock until units are on the API too; mock units only point at mock modules, so the
// unit screens' module picker must list those. Switch to MODULE_PATHS.list with the units API.
export async function getModuleOptions(): Promise<ModuleOption[]> {
   await mockDelay();
   return mockDb.modules.map(({ id, code, titleEn }) => ({ id, code, titleEn }));
}

/** null when the module doesn't exist (404) or the id isn't a valid UUID (400). */
export async function getModule(id: string): Promise<ModuleDetail | null> {
   try {
      return toDetail((await axiosApi.get<ModuleResponse>(MODULE_PATHS.detail(id))).data);
   } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      if (status === HttpStatusCode.NotFound || status === HttpStatusCode.BadRequest) return null;
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

/** 409 while the module still has content (PRD Q15). */
export async function deleteModule(id: string): Promise<void> {
   await axiosApi.delete(MODULE_PATHS.detail(id));
}
