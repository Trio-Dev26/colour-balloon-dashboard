// Shapes of the NestJS quiz API (/admin/quizzes), plus the HTML form the screens work with.
import type { JSONContent } from '@tiptap/core';
import type { ModuleStatus } from './module.types';
import type { QuestionType } from './question.types';

/** D16: a unit quiz belongs to one unit; the Chapter End Test (one per module) has no unit. */
export type QuizType = 'UNIT_QUIZ' | 'CHAPTER_END_TEST';

/** A question inside a quiz, in quiz order. */
export interface QuizQuestion {
   id: string;
   code: string;
   type: QuestionType;
   promptText: string;
   points: number;
   /** Position in the quiz, starting at 1. */
   sequence: number;
}

/** A quiz as the API sends it: descriptions are TipTap JSON documents or null. */
export interface QuizResponse {
   id: string;
   code: string;
   type: QuizType;
   moduleId: string;
   module: { id: string; code: string; titleEn: string; titleMy: string; status: ModuleStatus };
   unitId: string | null;
   unit: { id: string; code: string; titleEn: string; titleMy: string } | null;
   /** Required quizzes block unit completion (D5); the Chapter End Test is always required. */
   required: boolean;
   passPercent: number;
   /** Attempts before the 24-hour lock; null = unlimited (D24). */
   maxAttempts: number | null;
   titleEn: string;
   titleMy: string;
   descriptionEn: JSONContent | null;
   descriptionMy: JSONContent | null;
   questionCount: number;
   /** Sum of the question points (D21). */
   totalPoints: number;
   questions: QuizQuestion[];
   createdAt: string;
   updatedAt: string;
}

/** Row in the quiz list. */
export interface QuizListItem {
   id: string;
   code: string;
   type: QuizType;
   titleEn: string;
   titleMy: string;
   moduleId: string;
   moduleCode: string;
   unitId: string | null;
   unitCode: string | null;
   required: boolean;
   passPercent: number;
   maxAttempts: number | null;
   questionCount: number;
   totalPoints: number;
   updatedAt: string;
}

export interface QuizDetail extends QuizListItem {
   /** HTML; '' when there is none. */
   descriptionEn: string;
   descriptionMy: string;
   questions: QuizQuestion[];
}

/** Create / edit body (HTML rich text); the service converts it to the API body. */
export interface QuizPayload {
   type: QuizType;
   moduleId: string;
   /** Unit quiz only. */
   unitId?: string;
   required: boolean;
   passPercent: number;
   /** null = unlimited. */
   maxAttempts: number | null;
   titleEn: string;
   titleMy: string;
   descriptionEn: string;
   descriptionMy: string;
}

export interface QuizFilters {
   search?: string;
   moduleId?: string;
   unitId?: string;
   type?: QuizType;
   page: number;
}
