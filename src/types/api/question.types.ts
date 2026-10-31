// Shapes of the NestJS question API (/admin/questions), plus the HTML form the screens work with.
import type { JSONContent } from '@tiptap/core';
import type { ModuleStatus } from './module.types';

export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK' | 'MATCHING' | 'SEQUENCE';

/** An option, matching side or step: text and/or an image (mediaId from POST /admin/questions/media). */
export interface AnswerItem {
   text?: string;
   mediaId?: string;
}

/** `answers` per question type (Decision Log D22, D23). Saved items get an `id`; send it back when editing. */
export interface QuestionAnswersByType {
   MULTIPLE_CHOICE: { options: (AnswerItem & { id?: string; correct: boolean })[] };
   TRUE_FALSE: { correct: boolean };
   FILL_BLANK: { blanks: { accepted: string[] }[] };
   MATCHING: { pairs: { id?: string; left: AnswerItem; right: AnswerItem }[] };
   SEQUENCE: { steps: (AnswerItem & { id?: string })[] };
}

export type QuestionAnswers = QuestionAnswersByType[QuestionType];

/** An uploaded image: its id and a signed URL (valid 1 h) to show it. */
export interface QuestionMedia {
   id: string;
   url: string;
}

/**
 * A question as the API sends it; prompts and explanations are TipTap JSON documents. Myanmar-first (Q24): the Myanmar
 * prompt is required, English is an optional translation (none for FILL_BLANK). Answers are shared by both.
 */
export interface QuestionResponse {
   id: string;
   code: string;
   type: QuestionType;
   promptMy: JSONContent;
   /** Plain text of the prompts, for lists and search. */
   promptTextMy: string;
   promptEn: JSONContent | null;
   promptTextEn: string | null;
   promptMediaIds: string[];
   answers: QuestionAnswers;
   explanationMy: JSONContent | null;
   explanationEn: JSONContent | null;
   points: number;
   unitId: string;
   unit: {
      id: string;
      code: string;
      titleEn: string;
      titleMy: string;
      module: { id: string; code: string; titleEn: string; titleMy: string; status: ModuleStatus };
   };
   /** Quizzes using it; while not empty it can't be deleted (D18). */
   quizzes: { id: string; code: string }[];
   /** Detail only: every image the prompt and answers use. */
   media?: (QuestionMedia & { contentType: string })[];
   createdAt: string;
   updatedAt: string;
}

/** Row in the question list and the quiz's question picker. */
export interface QuestionListItem {
   id: string;
   code: string;
   type: QuestionType;
   promptText: string;
   points: number;
   unitId: string;
   unitCode: string;
   moduleId: string;
   moduleCode: string;
   quizCodes: string[];
   updatedAt: string;
}

export interface QuestionDetail extends QuestionListItem {
   /** Parent titles for the breadcrumb. */
   moduleTitleEn: string;
   unitTitleEn: string;
   /** HTML; the Myanmar prompt is always set, the others are '' when missing (learners then see Myanmar). */
   promptMy: string;
   promptEn: string;
   promptMediaIds: string[];
   answers: QuestionAnswers;
   explanationMy: string;
   explanationEn: string;
   /** Signed URL per media id, for the previews. */
   mediaUrls: Record<string, string>;
   /** Quizzes using it (D18), for the "Used in quizzes" card. */
   quizzes: { id: string; code: string }[];
}

/** Create / edit body (HTML rich text); the service converts it to the API body. */
export interface QuestionPayload {
   unitId: string;
   type: QuestionType;
   promptMy: string;
   /** '' = no English translation (sent as null, which clears it). */
   promptEn: string;
   promptMediaIds: string[];
   answers: QuestionAnswers;
   explanationMy: string;
   explanationEn: string;
   points: number;
}

export interface QuestionFilters {
   search?: string;
   moduleId?: string;
   unitId?: string;
   type?: QuestionType;
   page: number;
}
