import type { SelectOption, Tone } from '@/types/ui/common.types';
import type { QuizType } from '@/types/api/quiz.types';

/** URL query keys the quiz list filters by (besides page); same names as the API query params. */
export const QUIZ_FILTER_KEYS = ['search', 'moduleId', 'unitId', 'type'] as const;

// D16 (type) and D24 (default attempts before the 24-hour lock; '' = unlimited).
export const QUIZ_TYPE: Record<QuizType, { label: string; tone: Tone; defaultAttempts: string }> = {
   UNIT_QUIZ: { label: 'Unit quiz', tone: 'info', defaultAttempts: '' },
   CHAPTER_END_TEST: { label: 'Chapter End Test', tone: 'warning', defaultAttempts: '3' },
};

export const ATTEMPTS_LIMITS = { min: 1, max: 100 } as const;

/** null → "Unlimited", 3 → "3 per 24 h" (D24: the lock lasts 24 hours). */
export const attemptsLabel = (maxAttempts: number | null) =>
   maxAttempts === null ? 'Unlimited' : `${maxAttempts} per 24 h`;

export const QUIZ_TYPE_OPTIONS: SelectOption[] = Object.entries(QUIZ_TYPE).map(([value, { label }]) => ({
   value,
   label,
}));

export const PASS_PERCENT_LIMITS = { min: 1, max: 100 } as const;

/** Questions the "Add questions" picker shows per page. */
export const QUESTION_PICKER_PAGE_SIZE = 8;

export const QUIZ_HINTS = {
   cetExists: 'This module already has a Chapter End Test.',
   lockedOnEdit: 'A quiz’s type, module and unit can’t change. To move it, delete it and create it again.',
   cetAlwaysRequired: 'The Chapter End Test is always required. Learners must pass it to complete the module.',
   requiredUnitQuiz: 'Learners must pass this quiz to complete the unit.',
   cetNoUnit: 'Not needed for a Chapter End Test',
   attempts: 'Leave empty for unlimited. After the last attempt the quiz locks for 24 hours.',
} as const;

export const requiredLabel = (required: boolean) => (required ? 'Required' : 'Optional');

/** Warning on a quiz with no questions. A Required one blocks its unit (D5); the Chapter End Test blocks the module (D7). */
export const emptyQuizWarning = (required: boolean, type: QuizType) => {
   const base = 'This quiz has no questions yet, so learners can’t take it.';
   if (!required) return base;
   return `${base} Learners can’t finish the ${type === 'CHAPTER_END_TEST' ? 'module' : 'unit'} until you add some.`;
};

/** "70% · 7 of 10 points". Scores can be partial (D22), so the points needed keep one decimal. */
export const passMarkLabel = (passPercent: number, totalPoints: number) => {
   if (totalPoints === 0) return `${passPercent}%`;
   const needed = Math.round((totalPoints * passPercent * 10) / 100) / 10;
   return `${passPercent}% · ${needed} of ${totalPoints} point${totalPoints === 1 ? '' : 's'}`;
};
