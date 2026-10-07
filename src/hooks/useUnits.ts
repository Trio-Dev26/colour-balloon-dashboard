import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
   createUnit,
   deleteUnit,
   getModuleUnits,
   getUnit,
   getUnits,
   reorderModuleUnits,
   updateUnit,
} from '@/services/unit.service';
import type { UnitFilters, UnitPayload } from '@/types/api/unit.types';
import { unitKeys } from './queryKeys';
import { useInvalidateCurriculum } from './useInvalidateCurriculum';

export function useUnits(filters: UnitFilters) {
   return useQuery({
      queryKey: unitKeys.list(filters),
      queryFn: () => getUnits(filters),
      placeholderData: keepPreviousData,
   });
}

/** A module's units in unlock order (module detail page). */
export function useModuleUnits(moduleId: string) {
   return useQuery({ queryKey: unitKeys.byModule(moduleId), queryFn: () => getModuleUnits(moduleId) });
}

export function useUnit(id: string) {
   return useQuery({ queryKey: unitKeys.detail(id), queryFn: () => getUnit(id) });
}

export function useCreateUnit() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: UnitPayload) => createUnit(payload), onSuccess: invalidate });
}

export function useUpdateUnit(id: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: UnitPayload) => updateUnit(id, payload), onSuccess: invalidate });
}

export function useDeleteUnit() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (id: string) => deleteUnit(id), onSuccess: invalidate });
}

export function useReorderModuleUnits(moduleId: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({
      mutationFn: (unitIds: string[]) => reorderModuleUnits(moduleId, unitIds),
      onSuccess: invalidate,
   });
}
