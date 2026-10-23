// Shapes of the NestJS lesson file API (/admin/lessons/:lessonId/files).

/** The four file groups of a lesson (FR-FILE-001). Students only see STUDENT_*, teachers only TEACHER_*. */
export type LessonFileGroup = 'STUDENT_VIEW' | 'STUDENT_DOWNLOAD' | 'TEACHER_VIEW' | 'TEACHER_DOWNLOAD';

export type LessonFileAudience = 'STUDENT' | 'TEACHER';

export interface LessonFile {
   id: string;
   lessonId: string;
   group: LessonFileGroup;
   /** Position inside its group, starting at 1. */
   sequence: number;
   fileName: string;
   /** Detected from the file's bytes by the backend. */
   contentType: string;
   sizeBytes: number;
   /** Always set on new files; null only on files uploaded before captions were required. */
   captionEn: string | null;
   captionMy: string | null;
   /** Signed preview link, valid for 1 hour; never stored, refetch instead. */
   url: string;
   createdAt: string;
   updatedAt: string;
}

/** Step 1 of an upload: where the browser PUTs the file. */
export interface UploadUrlResponse {
   uploadUrl: string;
   key: string;
   expiresIn: number;
}

/** Both required when uploading and editing; learners and teachers see them next to the file. */
export interface LessonFileCaptions {
   captionEn: string;
   captionMy: string;
}
