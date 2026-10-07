import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteLesson, getUnitLessons, reorderUnitLessons } from '@/services/lesson.service';
import { lessonKeys } from './queryKeys';
import { useInvalidateCurriculum } from './useInvalidateCurriculum';

/** A unit's lessons in unlock order (unit detail page). */
export function useUnitLessons(unitId: string) {
   return useQuery({ queryKey: lessonKeys.byUnit(unitId), queryFn: () => getUnitLessons(unitId) });
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
