import { LESSON_FILE_MAX_BYTES } from '@/constants/lessonFile';
import type { LessonFileGroupConfig } from '@/types/ui/lessonFile.types';
import { formatFileSize } from './format';

/** Why a picked file can't go into the group, checked before uploading; undefined when it's fine. */
export function lessonFileProblem(config: LessonFileGroupConfig, file: File): string | undefined {
   if (file.size === 0) return 'The file is empty.';
   if (file.size > LESSON_FILE_MAX_BYTES) return `Files can be at most ${formatFileSize(LESSON_FILE_MAX_BYTES)}.`;
   if (!config.allowedType.test(file.type)) return `Not allowed here. Use ${config.formats}.`;
   return undefined;
}
