import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
   createLesson,
   deleteLesson,
   getLesson,
   getLessons,
   getUnitLessons,
   reorderUnitLessons,
   updateLesson,
} from '@/services/lesson.service';
import type { LessonFilters, LessonPayload } from '@/types/api/lesson.types';
import { lessonKeys } from './queryKeys';
import { useInvalidateCurriculum } from './useInvalidateCurriculum';

export function useLessons(filters: LessonFilters) {
   return useQuery({
      queryKey: lessonKeys.list(filters),
      queryFn: () => getLessons(filters),
      placeholderData: keepPreviousData,
   });
}

/** A unit's lessons in unlock order (unit detail page). */
export function useUnitLessons(unitId: string) {
   return useQuery({ queryKey: lessonKeys.byUnit(unitId), queryFn: () => getUnitLessons(unitId) });
}

export function useLesson(id: string) {
   return useQuery({ queryKey: lessonKeys.detail(id), queryFn: () => getLesson(id) });
}

export function useCreateLesson() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: LessonPayload) => createLesson(payload), onSuccess: invalidate });
}

export function useUpdateLesson(id: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: LessonPayload) => updateLesson(id, payload), onSuccess: invalidate });
}

export function useReorderUnitLessons(unitId: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({
      mutationFn: (lessonIds: string[]) => reorderUnitLessons(unitId, lessonIds),
      onSuccess: invalidate,
   });
}

export function useDeleteLesson() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (id: string) => deleteLesson(id), onSuccess: invalidate });
}
