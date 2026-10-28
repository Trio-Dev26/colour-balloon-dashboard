import type { LessonFileAudience } from '@/types/api/lessonFile.types';
import { EMPTY_VALUE } from './common';
import type { LessonFileGroupConfig } from '@/types/ui/lessonFile.types';

const MEGABYTE = 1024 * 1024;

/** FR-FILE-002: at most 200 MB per file (the backend checks again). */
export const LESSON_FILE_MAX_BYTES = 200 * MEGABYTE;

/** Caption length limit of the API. */
export const LESSON_FILE_CAPTION_MAX = 500;

// Same rules as the backend's lesson-file.constants.ts (D19: downloads are PDF, audio and images only).
const VIEWABLE = /^(application\/pdf|video\/(mp4|webm)|audio\/.+|image\/(jpeg|png|webp))$/;
const DOWNLOADABLE = /^(application\/pdf|audio\/.+|image\/(jpeg|png|webp))$/;

const VIEW_ACCEPT = 'application/pdf,video/mp4,video/webm,audio/*,image/jpeg,image/png,image/webp';
const DOWNLOAD_ACCEPT = 'application/pdf,audio/*,image/jpeg,image/png,image/webp';
const VIEW_FORMATS = 'PDF, MP4, WebM, audio, JPG, PNG, WebP';
const DOWNLOAD_FORMATS = 'PDF, audio, JPG, PNG, WebP';

/** The four groups in display order (FR-FILE-001); drives the Lesson Files section. */
export const LESSON_FILE_GROUPS: LessonFileGroupConfig[] = [
   {
      group: 'STUDENT_VIEW',
      audience: 'STUDENT',
      title: 'Lesson materials',
      description: 'Shown to students in this order. Students must open each one to finish the lesson.',
      accept: VIEW_ACCEPT,
      allowedType: VIEWABLE,
      formats: VIEW_FORMATS,
   },
   {
      group: 'STUDENT_DOWNLOAD',
      audience: 'STUDENT',
      title: 'Downloadable files',
      description: 'Students can download these. They are optional for finishing the lesson.',
      accept: DOWNLOAD_ACCEPT,
      allowedType: DOWNLOADABLE,
      formats: DOWNLOAD_FORMATS,
   },
   {
      group: 'TEACHER_VIEW',
      audience: 'TEACHER',
      title: 'Lesson materials',
      description: 'Guides, lesson plans and answer keys. Only teachers see these.',
      accept: VIEW_ACCEPT,
      allowedType: VIEWABLE,
      formats: VIEW_FORMATS,
   },
   {
      group: 'TEACHER_DOWNLOAD',
      audience: 'TEACHER',
      title: 'Downloadable files',
      description: 'Teachers can download these.',
      accept: DOWNLOAD_ACCEPT,
      allowedType: DOWNLOADABLE,
      formats: DOWNLOAD_FORMATS,
   },
];

/** Lesson table file columns: "3 files" (+ suffix, e.g. "3 files uploaded"), or EMPTY_VALUE when there are none. */
export const fileCountLabel = (count: number, suffix = '') =>
   count === 0 ? EMPTY_VALUE : `${count} ${count === 1 ? 'file' : 'files'}${suffix}`;

/** Tab names on the lesson page and file column headers in lesson tables. */
export const LESSON_FILE_AUDIENCE_LABELS: Record<LessonFileAudience, string> = {
   STUDENT: 'Learner side',
   TEACHER: 'Teacher side',
};

export const LESSON_FILE_AUDIENCES: { value: LessonFileAudience; label: string }[] = [
   { value: 'STUDENT', label: LESSON_FILE_AUDIENCE_LABELS.STUDENT },
   { value: 'TEACHER', label: LESSON_FILE_AUDIENCE_LABELS.TEACHER },
];
