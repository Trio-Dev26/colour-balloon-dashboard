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

/** null clears a caption. */
export interface LessonFileCaptions {
   captionEn: string | null;
   captionMy: string | null;
}
