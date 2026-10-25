import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
   createQuestion,
   deleteQuestion,
   getQuestion,
   getQuestions,
   updateQuestion,
   uploadQuestionMedia,
} from '@/services/question.service';
import type { QuestionFilters, QuestionPayload } from '@/types/api/question.types';
import { questionKeys } from './queryKeys';
import { useInvalidateCurriculum } from './useInvalidateCurriculum';

/** `limit` is for pickers that show more rows than the list page. */
export function useQuestions(filters: QuestionFilters, limit?: number) {
   return useQuery({
      queryKey: questionKeys.list(filters, limit),
      queryFn: () => getQuestions(filters, limit),
      placeholderData: keepPreviousData,
   });
}

export function useQuestion(id: string) {
   return useQuery({ queryKey: questionKeys.detail(id), queryFn: () => getQuestion(id) });
}

export function useCreateQuestion() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: QuestionPayload) => createQuestion(payload), onSuccess: invalidate });
}

export function useUpdateQuestion(id: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({
      mutationFn: (payload: QuestionPayload) => updateQuestion(id, payload),
      onSuccess: invalidate,
   });
}

export function useDeleteQuestion() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (id: string) => deleteQuestion(id), onSuccess: invalidate });
}

/** No invalidation: the image belongs to no question until the form is saved. */
export function useUploadQuestionMedia() {
   return useMutation({ mutationFn: (file: File) => uploadQuestionMedia(file) });
}
