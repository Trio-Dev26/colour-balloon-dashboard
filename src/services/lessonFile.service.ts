// Lesson file API calls (FR-FILE-001..005). The only layer that talks to the backend.
import axios from 'axios';
import axiosApi from '@/lib/axios';
import { LESSON_FILE_PATHS, UPLOAD_TIMEOUT_MS } from '@/constants/api';
import type { LessonFile, LessonFileCaptions, LessonFileGroup, UploadUrlResponse } from '@/types/api/lessonFile.types';

/** Every file of the lesson, by group then order. */
export async function getLessonFiles(lessonId: string): Promise<LessonFile[]> {
   return (await axiosApi.get<LessonFile[]>(LESSON_FILE_PATHS.list(lessonId))).data;
}

/**
 * Upload in three steps: get a signed URL, PUT the file straight to storage, then register it.
 * The file body never goes through the API (the /api rewrite caps bodies at ~21 MB).
 * `onProgress` gets 0..1 while the file is sent.
 */
export async function uploadLessonFile(
   lessonId: string,
   group: LessonFileGroup,
   file: File,
   captions: LessonFileCaptions,
   onProgress: (fraction: number) => void
): Promise<LessonFile> {
   const { uploadUrl, key } = (
      await axiosApi.post<UploadUrlResponse>(LESSON_FILE_PATHS.uploadUrl(lessonId), {
         group,
         fileName: file.name,
         contentType: file.type,
         size: file.size,
      })
   ).data;

   // Plain axios: the URL is storage, not /api, and must get no cookies, no API timeout and no refresh logic.
   await axios.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type },
      timeout: UPLOAD_TIMEOUT_MS,
      onUploadProgress: (event) => {
         if (event.total) onProgress(event.loaded / event.total);
      },
   });

   return (
      await axiosApi.post<LessonFile>(LESSON_FILE_PATHS.list(lessonId), {
         key,
         group,
         fileName: file.name,
         ...captions,
      })
   ).data;
}

export async function updateLessonFileCaptions(
   lessonId: string,
   fileId: string,
   captions: LessonFileCaptions
): Promise<LessonFile> {
   return (await axiosApi.patch<LessonFile>(LESSON_FILE_PATHS.detail(lessonId, fileId), captions)).data;
}

/** fileIds must list every file of the group once, in the new order. */
export async function reorderLessonFiles(lessonId: string, group: LessonFileGroup, fileIds: string[]): Promise<void> {
   await axiosApi.patch(LESSON_FILE_PATHS.reorder(lessonId), { group, fileIds });
}

/** Removes the file and its stored object for good. */
export async function deleteLessonFile(lessonId: string, fileId: string): Promise<void> {
   await axiosApi.delete(LESSON_FILE_PATHS.detail(lessonId, fileId));
}
