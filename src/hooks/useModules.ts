import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
   createModule,
   deleteModule,
   getModule,
   getModuleOptions,
   getModules,
   removeModuleThumbnail,
   updateModule,
   updateModuleStatus,
   uploadModuleThumbnail,
} from '@/services/module.service';
import type { ModuleFilters, ModuleOption, ModulePayload, ModuleStatus } from '@/types/api/module.types';
import type { SelectOption } from '@/types/ui/common.types';
import { moduleKeys } from './queryKeys';
import { useInvalidateCurriculum } from './useInvalidateCurriculum';

export function useModules(filters: ModuleFilters) {
   return useQuery({
      queryKey: moduleKeys.list(filters),
      queryFn: () => getModules(filters),
      placeholderData: keepPreviousData, // keep the current page visible while the next one loads
   });
}

/** Every module as { id, code, titleEn }, for module pickers and filters. */
export function useModuleOptions() {
   return useQuery({ queryKey: moduleKeys.options(), queryFn: getModuleOptions });
}

export function useModule(id: string) {
   return useQuery({ queryKey: moduleKeys.detail(id), queryFn: () => getModule(id) });
}

export function useCreateModule() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: ModulePayload) => createModule(payload), onSuccess: invalidate });
}

export function useUpdateModule(id: string) {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (payload: ModulePayload) => updateModule(id, payload), onSuccess: invalidate });
}

export function useUpdateModuleStatus() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({
      mutationFn: ({ id, status }: { id: string; status: ModuleStatus }) => updateModuleStatus(id, status),
      onSuccess: invalidate,
   });
}

/** A File uploads or replaces the thumbnail; null removes it. */
export function useSetModuleThumbnail() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({
      mutationFn: ({ id, file }: { id: string; file: File | null }) =>
         file ? uploadModuleThumbnail(id, file) : removeModuleThumbnail(id),
      onSuccess: invalidate,
   });
}

export function useDeleteModule() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (id: string) => deleteModule(id), onSuccess: invalidate });
}

/** Module picker options: "M1 · Foundations of Myanmar Language"; `include` narrows the list. */
export function useModuleSelectOptions(include: (module: ModuleOption) => boolean = () => true): SelectOption[] {
   const { data = [] } = useModuleOptions();
   return data.filter(include).map((module) => ({ value: module.id, label: `${module.code} · ${module.titleEn}` }));
}
