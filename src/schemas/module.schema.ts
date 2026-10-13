import { z } from 'zod';
import { MODULE_CODE_PATTERN, MODULE_IMAGE } from '@/constants/module';
import { htmlToText } from '@/lib/form';
import type { ModuleDetail } from '@/types/api/module.types';

const required = (message: string) => z.string().trim().min(1, message);
const requiredRichText = (message: string) => z.string().refine((html) => htmlToText(html).length > 0, message);

const imageSchema = z
   .union([
      z
         .instanceof(File)
         .refine((file) => (MODULE_IMAGE.mimeTypes as readonly string[]).includes(file.type), 'Use a JPG or PNG image')
         .refine((file) => file.size <= MODULE_IMAGE.maxSizeBytes, 'Image must be 20 MB or smaller'),
      z.string(), // URL of the image already saved (edit)
   ])
   .nullable();

// FR-CUR-002: level, category, code, image, and per language: title, description (optional),
// learning goal and learning outcome.
// TODO(api): send `image` once the API supports it.
export const moduleFormSchema = z.object({
   levelId: required('Choose a module level'),
   categoryId: required('Choose a category'),
   code: required('Module code is required')
      .toUpperCase()
      .regex(MODULE_CODE_PATTERN, 'Use 1–10 letters, numbers or underscores (e.g. M01)'),
   image: imageSchema,
   titleEn: required('English title is required'),
   titleMy: required('Myanmar title is required'),
   descriptionEn: z.string(),
   descriptionMy: z.string(),
   learningGoalEn: required('English learning goal is required'),
   learningGoalMy: required('Myanmar learning goal is required'),
   learningOutcomeEn: requiredRichText('English learning outcome is required'),
   learningOutcomeMy: requiredRichText('Myanmar learning outcome is required'),
});

export type ModuleFormValues = z.infer<typeof moduleFormSchema>;

export const EMPTY_MODULE_FORM: ModuleFormValues = {
   levelId: '',
   categoryId: '',
   code: '',
   image: null,
   titleEn: '',
   titleMy: '',
   descriptionEn: '',
   descriptionMy: '',
   learningGoalEn: '',
   learningGoalMy: '',
   learningOutcomeEn: '',
   learningOutcomeMy: '',
};

/** Edit form starting values from the saved module. */
export function moduleToFormValues(module: ModuleDetail): ModuleFormValues {
   return {
      levelId: module.level.id,
      categoryId: module.category.id,
      // The form edits only the suffix: "M01" of BEGINNER-READING-M01.
      code: module.code.slice(module.code.lastIndexOf('-') + 1),
      image: null,
      titleEn: module.titleEn,
      titleMy: module.titleMy,
      descriptionEn: module.descriptionEn,
      descriptionMy: module.descriptionMy,
      learningGoalEn: module.learningGoalEn,
      learningGoalMy: module.learningGoalMy,
      learningOutcomeEn: module.learningOutcomeEn,
      learningOutcomeMy: module.learningOutcomeMy,
   };
}
