import { keepPreviousData, useMutation, useQueries, useQuery } from '@tanstack/react-query';
import {
   createQuiz,
   deleteQuiz,
   getModuleChapterEndTest,
   getQuiz,
   getQuizzes,
   setQuizQuestions,
   updateQuiz,
} from '@/services/quiz.service';
import type { QuizFilters, QuizPayload } from '@/types/api/quiz.types';
import { quizKeys } from './queryKeys';
import { useInvalidateCurriculum } from './useInvalidateCurriculum';

export function useQuizzes(filters: QuizFilters) {
   return useQuery({
      queryKey: quizKeys.list(filters),
      queryFn: () => getQuizzes(filters),
      placeholderData: keepPreviousData,
   });
}

/** The module's Chapter End Test or null; disabled until a module is chosen. */
export function useModuleChapterEndTest(moduleId: string) {
   return useQuery({
      queryKey: quizKeys.chapterEndTest(moduleId),
      queryFn: () => getModuleChapterEndTest(moduleId),
      enabled: Boolean(moduleId),
   });
}

export function useQuiz(id: string) {
   return useQuery({ queryKey: quizKeys.detail(id), queryFn: () => getQuiz(id) });
}

/** Several quizzes by id, sharing each quiz's detail cache (e.g. the quizzes a question is used in). */
export function useQuizzesByIds(ids: string[]) {
   return useQueries({ queries: ids.map((id) => ({ queryKey: quizKeys.detail(id), queryFn: () => getQuiz(id) })) });
}

export function useCreateQuiz() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: QuizPayload) => createQuiz(payload), onSuccess: invalidate });
}

export function useUpdateQuiz(id: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: QuizPayload) => updateQuiz(id, payload), onSuccess: invalidate });
}

/** Saves the quiz's whole ordered question list. */
export function useSetQuizQuestions(id: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({
      mutationFn: (questionIds: string[]) => setQuizQuestions(id, questionIds),
      onSuccess: invalidate,
   });
}

export function useDeleteQuiz() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (id: string) => deleteQuiz(id), onSuccess: invalidate });
}
