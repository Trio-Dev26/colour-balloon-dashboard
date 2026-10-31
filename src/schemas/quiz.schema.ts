import { z } from 'zod';
import { TEXT_LIMITS } from '@/constants/common';
import { requiredText } from '@/lib/form';
import { ATTEMPTS_LIMITS, PASS_PERCENT_LIMITS, QUIZ_TYPE } from '@/constants/quiz';
import type { QuizDetail, QuizPayload, QuizType } from '@/types/api/quiz.types';

const required = (message: string) => z.string().trim().min(1, message);
const QUIZ_TYPES = Object.keys(QUIZ_TYPE) as [QuizType, ...QuizType[]];

const isWholeNumberIn = (value: string, { min, max }: { min: number; max: number }) => {
   const number = Number(value);
   return Number.isInteger(number) && number >= min && number <= max;
};

// FR-QUIZ-002, 003: module, type, unit (unit quiz only), pass mark %, attempts, Required or Optional,
// and in English and Myanmar a title and an optional description.
export const quizFormSchema = z
   .object({
      moduleId: required('Choose a module'),
      type: z.enum(QUIZ_TYPES, 'Choose a quiz type'),
      unitId: z.string(),
      required: z.boolean(),
      passPercent: z
         .string()
         .refine(
            (value) => isWholeNumberIn(value, PASS_PERCENT_LIMITS),
            `Pass mark must be a whole number from ${PASS_PERCENT_LIMITS.min} to ${PASS_PERCENT_LIMITS.max}`
         ),
      // '' = unlimited (D24).
      maxAttempts: z
         .string()
         .refine(
            (value) => !value || isWholeNumberIn(value, ATTEMPTS_LIMITS),
            `Attempts must be a whole number from ${ATTEMPTS_LIMITS.min} to ${ATTEMPTS_LIMITS.max}, or empty for unlimited`
         ),
      titleEn: requiredText('English title', TEXT_LIMITS.title),
      titleMy: requiredText('Myanmar title', TEXT_LIMITS.title),
      descriptionEn: z.string(),
      descriptionMy: z.string(),
   })
   .refine((values) => values.type !== 'UNIT_QUIZ' || values.unitId, { path: ['unitId'], message: 'Choose a unit' });

export type QuizFormValues = z.infer<typeof quizFormSchema>;

export const EMPTY_QUIZ_FORM: QuizFormValues = {
   moduleId: '',
   type: 'UNIT_QUIZ',
   unitId: '',
   required: true,
   passPercent: '70',
   maxAttempts: QUIZ_TYPE.UNIT_QUIZ.defaultAttempts,
   titleEn: '',
   titleMy: '',
   descriptionEn: '',
   descriptionMy: '',
};

/** Edit form starting values from the saved quiz. */
export function quizToFormValues(quiz: QuizDetail): QuizFormValues {
   return {
      moduleId: quiz.moduleId,
      type: quiz.type,
      unitId: quiz.unitId ?? '',
      required: quiz.required,
      passPercent: String(quiz.passPercent),
      maxAttempts: quiz.maxAttempts === null ? '' : String(quiz.maxAttempts),
      titleEn: quiz.titleEn,
      titleMy: quiz.titleMy,
      descriptionEn: quiz.descriptionEn,
      descriptionMy: quiz.descriptionMy,
   };
}

/** The API body: the Chapter End Test has no unit and is always required (D16); empty attempts = unlimited. */
export const toQuizPayload = (values: QuizFormValues): QuizPayload => {
   const isUnitQuiz = values.type === 'UNIT_QUIZ';
   return {
      ...values,
      unitId: isUnitQuiz ? values.unitId : undefined,
      required: isUnitQuiz ? values.required : true,
      passPercent: Number(values.passPercent),
      maxAttempts: values.maxAttempts ? Number(values.maxAttempts) : null,
   };
};
