import { z } from 'zod';
import { TEXT_LIMITS } from '@/constants/common';
import { requiredText } from '@/lib/form';
import type { UnitDetail, UnitPayload } from '@/types/api/unit.types';

const required = (message: string) => z.string().trim().min(1, message);

// FR-CUR-004: module, and in English and Myanmar a title and an optional description.
export const unitFormSchema = z.object({
   moduleId: required('Choose a module'),
   titleEn: requiredText('English title', TEXT_LIMITS.title),
   titleMy: requiredText('Myanmar title', TEXT_LIMITS.title),
   descriptionEn: z.string(),
   descriptionMy: z.string(),
}) satisfies z.ZodType<UnitPayload>;

export type UnitFormValues = z.infer<typeof unitFormSchema>;

export const EMPTY_UNIT_FORM: UnitFormValues = {
   moduleId: '',
   titleEn: '',
   titleMy: '',
   descriptionEn: '',
   descriptionMy: '',
};

/** Edit form starting values from the saved unit. */
export function unitToFormValues(unit: UnitDetail): UnitFormValues {
   return {
      moduleId: unit.moduleId,
      titleEn: unit.titleEn,
      titleMy: unit.titleMy,
      descriptionEn: unit.descriptionEn,
      descriptionMy: unit.descriptionMy,
   };
}
