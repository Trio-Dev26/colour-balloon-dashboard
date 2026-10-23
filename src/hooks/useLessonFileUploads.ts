import { useState } from 'react';
import { apiErrorMessage, isRejectedInput } from '@/lib/form';
import { lessonFileProblem } from '@/lib/lessonFile';
import type { LessonFileCaptions } from '@/types/api/lessonFile.types';
import type { LessonFileGroupConfig, PendingUpload } from '@/types/ui/lessonFile.types';
import { useUploadLessonFile } from './useLessonFiles';

/** A picked file with the captions the admin gave it. */
export interface CaptionedFile {
   file: File;
   captions: LessonFileCaptions;
}

/**
 * Uploads captioned files into one group, several at a time, with progress (FR-FILE-002).
 * A finished upload leaves the list once the lesson's files are refetched; a failed one stays
 * with its reason until retried or dismissed.
 */
export function useLessonFileUploads(lessonId: string, config: LessonFileGroupConfig) {
   const [uploads, setUploads] = useState<PendingUpload[]>([]);
   const { mutateAsync } = useUploadLessonFile(lessonId);

   const add = (upload: Omit<PendingUpload, 'id' | 'progress'>) => {
      const id = crypto.randomUUID();
      setUploads((list) => [...list, { id, progress: 0, ...upload }]);
      return id;
   };

   const patch = (id: string, change: Partial<PendingUpload>) =>
      setUploads((list) => list.map((upload) => (upload.id === id ? { ...upload, ...change } : upload)));

   const dismiss = (id: string) => setUploads((list) => list.filter((upload) => upload.id !== id));

   const run = async (id: string, { file, captions }: CaptionedFile) => {
      patch(id, { progress: 0, error: undefined });
      try {
         await mutateAsync({ group: config.group, file, captions, onProgress: (progress) => patch(id, { progress }) });
         dismiss(id);
      } catch (error) {
         patch(id, {
            error: apiErrorMessage(error, 'Upload failed. Please try again.'),
            retryable: !isRejectedInput(error),
         });
      }
   };

   /** Shows files with the wrong type or size as failed rows right away; returns the ones that can go up. */
   const screen = (files: File[]) =>
      files.filter((file) => {
         const error = lessonFileProblem(config, file);
         if (error) add({ file, error });
         return !error;
      });

   const start = (items: CaptionedFile[]) => {
      for (const item of items) void run(add(item), item);
   };

   const retry = (id: string) => {
      const upload = uploads.find((item) => item.id === id);
      if (upload?.captions) void run(id, { file: upload.file, captions: upload.captions });
   };

   return { uploads, screen, start, retry, dismiss };
}
