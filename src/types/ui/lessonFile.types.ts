import type { LessonFileAudience, LessonFileGroup } from '@/types/api/lessonFile.types';

/** How one lesson file group is shown and what it accepts (constants/lessonFile.ts). */
export interface LessonFileGroupConfig {
   group: LessonFileGroup;
   audience: LessonFileAudience;
   title: string;
   description: string;
   /** The file input's accept attribute. */
   accept: string;
   /** Checked against File.type before uploading, for instant feedback. */
   allowedType: RegExp;
   formats: string;
}

/** A file being uploaded, or one that failed (it then stays until retried or dismissed). */
export interface PendingUpload {
   id: string;
   file: File;
   /** 0..1 */
   progress: number;
   error?: string;
   /** Only for network or storage failures; a file that is itself wrong (type, size) would fail again. */
   retryable?: boolean;
}
