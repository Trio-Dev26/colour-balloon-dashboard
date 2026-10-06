import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   deleteModule,
   getModule,
   getModuleUnits,
   getModules,
   reorderModuleUnits,
   updateModuleStatus,
} from '@/services/module.service';
import type { ModuleFilters, ModuleStatus } from '@/types/api/module.types';

export const moduleKeys = {
   all: ['modules'] as const,
   list: (filters: ModuleFilters) => [...moduleKeys.all, 'list', filters] as const,
   detail: (id: string) => [...moduleKeys.all, 'detail', id] as const,
   units: (id: string) => [...moduleKeys.all, 'detail', id, 'units'] as const,
};

export function useModules(filters: ModuleFilters) {
   return useQuery({
      queryKey: moduleKeys.list(filters),
      queryFn: () => getModules(filters),
      placeholderData: keepPreviousData, // keep the current page visible while the next one loads
   });
}

export function useModule(id: string) {
   return useQuery({ queryKey: moduleKeys.detail(id), queryFn: () => getModule(id) });
}

export function useModuleUnits(id: string) {
   return useQuery({ queryKey: moduleKeys.units(id), queryFn: () => getModuleUnits(id) });
}

export function useUpdateModuleStatus() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({ id, status }: { id: string; status: ModuleStatus }) => updateModuleStatus(id, status),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: moduleKeys.all }),
   });
}

export function useDeleteModule() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (id: string) => deleteModule(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: moduleKeys.all }),
   });
}

export function useReorderModuleUnits(moduleId: string) {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (unitIds: string[]) => reorderModuleUnits(moduleId, unitIds),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: moduleKeys.all }),
   });
}
