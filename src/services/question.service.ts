// Question bank API calls (FR-QB-001..007). The only layer that talks to the backend.
import axiosApi, { isMissingRecord } from '@/lib/axios';
import { toPaginated } from '@/lib/pagination';
import { docToHtml, htmlToDoc } from '@/lib/richText';
import { QUESTION_PATHS } from '@/constants/api';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import { QUESTION_IMAGE } from '@/constants/question';
import type { ApiPage, Paginated } from '@/types/api/pagination.types';
import type {
   QuestionDetail,
   QuestionFilters,
   QuestionListItem,
   QuestionMedia,
   QuestionPayload,
   QuestionResponse,
} from '@/types/api/question.types';

const toListItem = (question: QuestionResponse): QuestionListItem => ({
   id: question.id,
   code: question.code,
   type: question.type,
   promptText: question.promptText,
   points: question.points,
   unitId: question.unitId,
   unitCode: question.unit.code,
   moduleId: question.unit.module.id,
   moduleCode: question.unit.module.code,
   quizCodes: question.quizzes.map((quiz) => quiz.code),
   updatedAt: question.updatedAt,
});

const toDetail = (question: QuestionResponse): QuestionDetail => ({
   ...toListItem(question),
   moduleTitleEn: question.unit.module.titleEn,
   unitTitleEn: question.unit.titleEn,
   prompt: docToHtml(question.prompt),
   promptMediaIds: question.promptMediaIds,
   answers: question.answers,
   explanation: question.explanation ? docToHtml(question.explanation) : '',
   mediaUrls: Object.fromEntries((question.media ?? []).map((media) => [media.id, media.url])),
});

/** Everything but the unit, which only create sends (D28: it never changes). */
const toBody = ({ type, prompt, promptMediaIds, answers, explanation, points }: QuestionPayload) => ({
   type,
   prompt: htmlToDoc(prompt),
   promptMediaIds,
   answers,
   explanation: explanation ? htmlToDoc(explanation) : null,
   points,
});

/** Page `filters.page` of the bank; `limit` defaults to the table page size. */
export async function getQuestions(
   filters: QuestionFilters,
   limit = DEFAULT_PAGE_SIZE
): Promise<Paginated<QuestionListItem>> {
   const page = (await axiosApi.get<ApiPage<QuestionResponse>>(QUESTION_PATHS.list, { params: { ...filters, limit } }))
      .data;
   return toPaginated({ ...page, items: page.items.map(toListItem) });
}

/** null when the question doesn't exist (404) or the id isn't a valid UUID (400). */
export async function getQuestion(id: string): Promise<QuestionDetail | null> {
   try {
      return toDetail((await axiosApi.get<QuestionResponse>(QUESTION_PATHS.detail(id))).data);
   } catch (error) {
      if (isMissingRecord(error)) return null;
      throw error;
   }
}

/** The backend generates the code (QN001…). */
export async function createQuestion(payload: QuestionPayload): Promise<QuestionListItem> {
   return toListItem(
      (await axiosApi.post<QuestionResponse>(QUESTION_PATHS.list, { ...toBody(payload), unitId: payload.unitId })).data
   );
}

/** The unit never changes (D28), so it isn't sent. Images left out of the prompt and answers are deleted. */
export async function updateQuestion(id: string, payload: QuestionPayload): Promise<void> {
   await axiosApi.patch(QUESTION_PATHS.detail(id), toBody(payload));
}

/** 409 while the question is in a quiz (D18). */
export async function deleteQuestion(id: string): Promise<void> {
   await axiosApi.delete(QUESTION_PATHS.detail(id));
}

/** Uploads an image while the form is open; it belongs to no question until one is saved with its id. */
export async function uploadQuestionMedia(file: File): Promise<QuestionMedia> {
   const body = new FormData();
   body.append(QUESTION_IMAGE.uploadField, file);
   const { id, url } = (await axiosApi.post<QuestionMedia>(QUESTION_PATHS.media, body)).data;
   return { id, url };
}
