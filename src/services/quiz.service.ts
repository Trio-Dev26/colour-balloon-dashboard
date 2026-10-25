// Quiz API calls (FR-QUIZ-001..005). The only layer that talks to the backend.
import axiosApi, { isMissingRecord } from '@/lib/axios';
import { toPaginated } from '@/lib/pagination';
import { docToHtml, htmlToDoc } from '@/lib/richText';
import { QUIZ_PATHS } from '@/constants/api';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import type { ApiPage, Paginated } from '@/types/api/pagination.types';
import type { QuizDetail, QuizFilters, QuizListItem, QuizPayload, QuizResponse } from '@/types/api/quiz.types';

const toListItem = (quiz: QuizResponse): QuizListItem => ({
   id: quiz.id,
   code: quiz.code,
   type: quiz.type,
   titleEn: quiz.titleEn,
   titleMy: quiz.titleMy,
   moduleId: quiz.moduleId,
   moduleCode: quiz.module.code,
   unitId: quiz.unitId,
   unitCode: quiz.unit?.code ?? null,
   required: quiz.required,
   passPercent: quiz.passPercent,
   maxAttempts: quiz.maxAttempts,
   questionCount: quiz.questionCount,
   totalPoints: quiz.totalPoints,
   updatedAt: quiz.updatedAt,
});

/** Empty descriptions are sent as null (optional on the API). */
const toDoc = (html: string) => (html ? htmlToDoc(html) : null);

/** The fields an edit may change; type, module and unit never change (D28). */
const toEditableBody = (payload: QuizPayload) => ({
   titleEn: payload.titleEn,
   titleMy: payload.titleMy,
   descriptionEn: toDoc(payload.descriptionEn),
   descriptionMy: toDoc(payload.descriptionMy),
   passPercent: payload.passPercent,
   maxAttempts: payload.maxAttempts,
   // The Chapter End Test is always required; the API rejects `required` false for it.
   ...(payload.type === 'UNIT_QUIZ' && { required: payload.required }),
});

export async function getQuizzes(filters: QuizFilters): Promise<Paginated<QuizListItem>> {
   const page = (
      await axiosApi.get<ApiPage<QuizResponse>>(QUIZ_PATHS.list, { params: { ...filters, limit: DEFAULT_PAGE_SIZE } })
   ).data;
   return toPaginated({ ...page, items: page.items.map(toListItem) });
}

/** The module's Chapter End Test, or null when it has none yet (D16: at most one). */
export async function getModuleChapterEndTest(moduleId: string): Promise<QuizListItem | null> {
   const page = (
      await axiosApi.get<ApiPage<QuizResponse>>(QUIZ_PATHS.list, {
         params: { moduleId, type: 'CHAPTER_END_TEST', page: 1, limit: 1 },
      })
   ).data;
   return page.items[0] ? toListItem(page.items[0]) : null;
}

/** null when the quiz doesn't exist (404) or the id isn't a valid UUID (400). */
export async function getQuiz(id: string): Promise<QuizDetail | null> {
   try {
      const quiz = (await axiosApi.get<QuizResponse>(QUIZ_PATHS.detail(id))).data;
      return {
         ...toListItem(quiz),
         descriptionEn: quiz.descriptionEn ? docToHtml(quiz.descriptionEn) : '',
         descriptionMy: quiz.descriptionMy ? docToHtml(quiz.descriptionMy) : '',
         questions: quiz.questions,
      };
   } catch (error) {
      if (isMissingRecord(error)) return null;
      throw error;
   }
}

/** A unit quiz is created with its unit, the Chapter End Test with its module (D16). Starts with no questions. */
export async function createQuiz(payload: QuizPayload): Promise<QuizListItem> {
   const target = payload.type === 'UNIT_QUIZ' ? { unitId: payload.unitId } : { moduleId: payload.moduleId };
   const body = { type: payload.type, ...target, ...toEditableBody(payload) };
   return toListItem((await axiosApi.post<QuizResponse>(QUIZ_PATHS.list, body)).data);
}

export async function updateQuiz(id: string, payload: QuizPayload): Promise<void> {
   await axiosApi.patch(QUIZ_PATHS.detail(id), toEditableBody(payload));
}

/** questionIds is the whole ordered list; adding, removing and reordering all save it. */
export async function setQuizQuestions(id: string, questionIds: string[]): Promise<void> {
   await axiosApi.put(QUIZ_PATHS.questions(id), { questionIds });
}

export async function deleteQuiz(id: string): Promise<void> {
   await axiosApi.delete(QUIZ_PATHS.detail(id));
}
