import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { deleteModule, getModule, getModuleOptions, getModules, updateModuleStatus } from '@/services/module.service';
import type { ModuleFilters, ModuleStatus } from '@/types/api/module.types';
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

export function useUpdateModuleStatus() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({
      mutationFn: ({ id, status }: { id: string; status: ModuleStatus }) => updateModuleStatus(id, status),
      onSuccess: invalidate,
   });
}

export function useDeleteModule() {
   const invalidate = useInvalidateCurriculum();
   return useMutation({ mutationFn: (id: string) => deleteModule(id), onSuccess: invalidate });
}

/** Module picker options: "M1 · Foundations of Myanmar Language". */
export function useModuleSelectOptions(): SelectOption[] {
   const { data = [] } = useModuleOptions();
   return data.map((module) => ({ value: module.id, label: `${module.code} · ${module.titleEn}` }));
}
