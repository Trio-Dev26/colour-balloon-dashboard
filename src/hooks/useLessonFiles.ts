import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   deleteLessonFile,
   getLessonFiles,
   reorderLessonFiles,
   updateLessonFileCaptions,
   uploadLessonFile,
} from '@/services/lessonFile.service';
import type { LessonFileCaptions, LessonFileGroup } from '@/types/api/lessonFile.types';
import { lessonFileKeys, lessonKeys } from './queryKeys';

/** All files of a lesson; preview URLs expire after an hour, so this refetches like any other query. */
export function useLessonFiles(lessonId: string) {
   return useQuery({ queryKey: lessonFileKeys.byLesson(lessonId), queryFn: () => getLessonFiles(lessonId) });
}

/** Returns a function that refreshes the lesson's files and the lessons, which show file counts (use in onSuccess). */
function useInvalidateLessonFiles(lessonId: string) {
   const queryClient = useQueryClient();
   return () =>
      Promise.all(
         [lessonFileKeys.byLesson(lessonId), lessonKeys.all].map((queryKey) =>
            queryClient.invalidateQueries({ queryKey })
         )
      );
}

export function useUploadLessonFile(lessonId: string) {
   const invalidate = useInvalidateLessonFiles(lessonId);
   return useMutation({
      mutationFn: ({
         group,
         file,
         onProgress,
      }: {
         group: LessonFileGroup;
         file: File;
         onProgress: (fraction: number) => void;
      }) => uploadLessonFile(lessonId, group, file, onProgress),
      onSuccess: invalidate,
   });
}

export function useUpdateLessonFileCaptions(lessonId: string) {
   const invalidate = useInvalidateLessonFiles(lessonId);
   return useMutation({
      mutationFn: ({ fileId, captions }: { fileId: string; captions: LessonFileCaptions }) =>
         updateLessonFileCaptions(lessonId, fileId, captions),
      onSuccess: invalidate,
   });
}

export function useReorderLessonFiles(lessonId: string, group: LessonFileGroup) {
   const invalidate = useInvalidateLessonFiles(lessonId);
   return useMutation({
      mutationFn: (fileIds: string[]) => reorderLessonFiles(lessonId, group, fileIds),
      onSuccess: invalidate,
   });
}

export function useDeleteLessonFile(lessonId: string) {
   const invalidate = useInvalidateLessonFiles(lessonId);
   return useMutation({ mutationFn: (fileId: string) => deleteLessonFile(lessonId, fileId), onSuccess: invalidate });
}
