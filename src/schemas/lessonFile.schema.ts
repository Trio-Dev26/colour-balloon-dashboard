import { z } from 'zod';
import { LESSON_FILE_CAPTION_MAX } from '@/constants/lessonFile';
import type { LessonFile, LessonFileCaptions } from '@/types/api/lessonFile.types';

const caption = z
   .string()
   .trim()
   .max(LESSON_FILE_CAPTION_MAX, `Captions can be at most ${LESSON_FILE_CAPTION_MAX} characters`);

// FR-FILE-003: an optional caption per file, in English and Myanmar.
export const lessonFileCaptionSchema = z.object({ captionEn: caption, captionMy: caption });

export type LessonFileCaptionValues = z.infer<typeof lessonFileCaptionSchema>;

export const fileToCaptionValues = (file: LessonFile): LessonFileCaptionValues => ({
   captionEn: file.captionEn ?? '',
   captionMy: file.captionMy ?? '',
});

/** An empty caption is sent as null, which clears it. */
export const toCaptions = (values: LessonFileCaptionValues): LessonFileCaptions => ({
   captionEn: values.captionEn || null,
   captionMy: values.captionMy || null,
});
