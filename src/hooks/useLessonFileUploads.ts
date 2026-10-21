import { useState } from 'react';
import { apiErrorMessage, isRejectedInput } from '@/lib/form';
import { lessonFileProblem } from '@/lib/lessonFile';
import type { LessonFileGroupConfig, PendingUpload } from '@/types/ui/lessonFile.types';
import { useUploadLessonFile } from './useLessonFiles';

/**
 * Uploads picked files into one group, several at a time, with progress (FR-FILE-002).
 * A finished upload leaves the list once the lesson's files are refetched; a failed one stays
 * with its reason until retried or dismissed.
 */
export function useLessonFileUploads(lessonId: string, config: LessonFileGroupConfig) {
   const [uploads, setUploads] = useState<PendingUpload[]>([]);
   const { mutateAsync } = useUploadLessonFile(lessonId);

   const patch = (id: string, change: Partial<PendingUpload>) =>
      setUploads((list) => list.map((upload) => (upload.id === id ? { ...upload, ...change } : upload)));

   const dismiss = (id: string) => setUploads((list) => list.filter((upload) => upload.id !== id));

   const run = async (id: string, file: File) => {
      patch(id, { progress: 0, error: undefined });
      try {
         await mutateAsync({ group: config.group, file, onProgress: (progress) => patch(id, { progress }) });
         dismiss(id);
      } catch (error) {
         patch(id, {
            error: apiErrorMessage(error, 'Upload failed. Please try again.'),
            retryable: !isRejectedInput(error),
         });
      }
   };

   const start = (files: File[]) => {
      for (const file of files) {
         const id = crypto.randomUUID();
         const error = lessonFileProblem(config, file);
         setUploads((list) => [...list, { id, file, progress: 0, error }]);
         if (!error) void run(id, file);
      }
   };

   const retry = (id: string) => {
      const upload = uploads.find((item) => item.id === id);
      if (upload) void run(id, upload.file);
   };

   return { uploads, start, retry, dismiss };
}
