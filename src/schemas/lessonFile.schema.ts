import { z } from 'zod';
import { LESSON_FILE_CAPTION_MAX } from '@/constants/lessonFile';
import type { LessonFile } from '@/types/api/lessonFile.types';

const caption = (language: string) =>
   z
      .string()
      .trim()
      .min(1, `Enter the ${language} caption`)
      .max(LESSON_FILE_CAPTION_MAX, `Captions can be at most ${LESSON_FILE_CAPTION_MAX} characters`);

// Every file needs both captions: learners and teachers see them next to the file.
export const lessonFileCaptionSchema = z.object({ captionEn: caption('English'), captionMy: caption('Myanmar') });

export type LessonFileCaptionValues = z.infer<typeof lessonFileCaptionSchema>;

/** Captions for a batch of picked files, in the same order as the files. */
export const lessonFileUploadSchema = z.object({ files: z.array(lessonFileCaptionSchema) });

export type LessonFileUploadValues = z.infer<typeof lessonFileUploadSchema>;

export const fileToCaptionValues = (file: LessonFile): LessonFileCaptionValues => ({
   captionEn: file.captionEn ?? '',
   captionMy: file.captionMy ?? '',
});
