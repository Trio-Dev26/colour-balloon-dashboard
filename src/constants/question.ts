import type { SelectOption } from '@/types/ui/common.types';
import type { QuestionType } from '@/types/api/question.types';
import { MODULE_IMAGE } from './module';

/** URL query keys the question list filters by (besides page); same names as the API query params. */
export const QUESTION_FILTER_KEYS = ['search', 'moduleId', 'unitId', 'type'] as const;

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
   MULTIPLE_CHOICE: 'Multiple choice',
   TRUE_FALSE: 'True / False',
   FILL_BLANK: 'Fill in the blank',
   MATCHING: 'Matching',
   SEQUENCE: 'Sequence',
};

export const QUESTION_TYPE_OPTIONS: SelectOption[] = Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => ({
   value,
   label,
}));

// Same limits the API checks (PRD FR-QB-002..007).
export const QUESTION_LIMITS = {
   minItems: 2,
   maxItems: 20,
   maxPromptImages: 5,
   minPoints: 1,
   maxPoints: 100,
} as const;

/** D23: each run of three or more underscores in the prompt is a blank. */
export const BLANK_MARKER = /_{3,}/g;

/** Accepted answers for one blank are typed in one box, separated by this. */
export const ACCEPTED_ANSWER_SEPARATOR = ',';

/** Question images follow the module image rule (BR-16: JPG/PNG up to 20 MB). */
export const QUESTION_IMAGE = MODULE_IMAGE;

export const questionInUseReason = (quizCodes: string[]) =>
   quizCodes.length ? `Used in ${quizCodes.join(', ')}. Remove it from those quizzes first.` : undefined;
