import { z } from 'zod';
import { TEXT_LIMITS } from '@/constants/common';
import { requiredText } from '@/lib/form';
import type { LessonDetail, LessonPayload } from '@/types/api/lesson.types';

const required = (message: string) => z.string().trim().min(1, message);

// FR-CUR-005: module and unit, and in English and Myanmar a title and an optional description.
// moduleId only narrows the unit picker; the API takes the unit (its module is implied).
export const lessonFormSchema = z.object({
   moduleId: required('Choose a module'),
   unitId: required('Choose a unit'),
   titleEn: requiredText('English title', TEXT_LIMITS.title),
   titleMy: requiredText('Myanmar title', TEXT_LIMITS.title),
   descriptionEn: z.string(),
   descriptionMy: z.string(),
}) satisfies z.ZodType<LessonPayload & { moduleId: string }>;

export type LessonFormValues = z.infer<typeof lessonFormSchema>;

export const EMPTY_LESSON_FORM: LessonFormValues = {
   moduleId: '',
   unitId: '',
   titleEn: '',
   titleMy: '',
   descriptionEn: '',
   descriptionMy: '',
};

/** Edit form starting values from the saved lesson. */
export function lessonToFormValues(lesson: LessonDetail): LessonFormValues {
   return {
      moduleId: lesson.moduleId,
      unitId: lesson.unitId,
      titleEn: lesson.titleEn,
      titleMy: lesson.titleMy,
      descriptionEn: lesson.descriptionEn,
      descriptionMy: lesson.descriptionMy,
   };
}

/** The API body: everything but the module. */
export const toLessonPayload = ({
   unitId,
   titleEn,
   titleMy,
   descriptionEn,
   descriptionMy,
}: LessonFormValues): LessonPayload => ({ unitId, titleEn, titleMy, descriptionEn, descriptionMy });
