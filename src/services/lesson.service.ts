// Lesson API calls (FR-CUR-005, FR-CUR-006). The only layer that talks to the backend.
import axiosApi, { isMissingRecord } from '@/lib/axios';
import { toPaginated } from '@/lib/pagination';
import { docToHtml, htmlToDoc } from '@/lib/richText';
import { LESSON_PATHS, MAX_PAGE_SIZE } from '@/constants/api';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import type { ApiPage, Paginated } from '@/types/api/pagination.types';
import type {
   LessonDetail,
   LessonFilters,
   LessonListItem,
   LessonPayload,
   LessonResponse,
} from '@/types/api/lesson.types';

const toListItem = (lesson: LessonResponse): LessonListItem => ({
   id: lesson.id,
   unitId: lesson.unitId,
   unitCode: lesson.unit.code,
   moduleId: lesson.unit.module.id,
   moduleCode: lesson.unit.module.code,
   moduleStatus: lesson.unit.module.status,
   code: lesson.code,
   order: lesson.sequence,
   titleEn: lesson.titleEn,
   titleMy: lesson.titleMy,
   fileCounts: lesson.fileCounts,
   updatedAt: lesson.updatedAt,
});

const toBody = (payload: LessonPayload) => ({
   ...payload,
   descriptionEn: htmlToDoc(payload.descriptionEn),
   descriptionMy: htmlToDoc(payload.descriptionMy),
});

const fetchPage = async (params: LessonFilters & { limit: number }) =>
   (await axiosApi.get<ApiPage<LessonResponse>>(LESSON_PATHS.list, { params })).data;

export async function getLessons(filters: LessonFilters): Promise<Paginated<LessonListItem>> {
   const page = await fetchPage({ ...filters, limit: DEFAULT_PAGE_SIZE });
   return toPaginated({ ...page, items: page.items.map(toListItem) });
}

/** Up to MAX_PAGE_SIZE lessons and the overall total (dashboard). */
export async function getLessonSample(): Promise<{ items: LessonListItem[]; total: number }> {
   const page = await fetchPage({ page: 1, limit: MAX_PAGE_SIZE });
   return { items: page.items.map(toListItem), total: page.total };
}

/** A unit's lessons in unlock order. */
export async function getUnitLessons(unitId: string): Promise<LessonListItem[]> {
   // ponytail: one page of MAX_PAGE_SIZE; page through if a unit ever passes 100 lessons.
   const page = await fetchPage({ unitId, page: 1, limit: MAX_PAGE_SIZE });
   return page.items.map(toListItem);
}

/** null when the lesson doesn't exist (404) or the id isn't a valid UUID (400). */
export async function getLesson(id: string): Promise<LessonDetail | null> {
   try {
      const lesson = (await axiosApi.get<LessonResponse>(LESSON_PATHS.detail(id))).data;
      const { level, category } = lesson.unit.module;
      return {
         ...toListItem(lesson),
         descriptionEn: docToHtml(lesson.descriptionEn),
         descriptionMy: docToHtml(lesson.descriptionMy),
         level,
         category,
      };
   } catch (error) {
      if (isMissingRecord(error)) return null;
      throw error;
   }
}

/** The backend generates the code and puts the lesson at the end of its unit. */
export async function createLesson(payload: LessonPayload): Promise<LessonListItem> {
   return toListItem((await axiosApi.post<LessonResponse>(LESSON_PATHS.list, toBody(payload))).data);
}

/** A different unitId (any unit of a Draft module, D28) moves the lesson to the end of that unit; its code stays the same. */
export async function updateLesson(id: string, payload: LessonPayload): Promise<void> {
   await axiosApi.patch(LESSON_PATHS.detail(id), toBody(payload));
}

/** lessonIds must list every lesson of the unit once; the order is the unlock order. */
export async function reorderUnitLessons(unitId: string, lessonIds: string[]): Promise<void> {
   await axiosApi.patch(LESSON_PATHS.reorder, { unitId, lessonIds });
}

export async function deleteLesson(id: string): Promise<void> {
   await axiosApi.delete(LESSON_PATHS.detail(id));
}
