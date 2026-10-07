import { useQueryClient } from '@tanstack/react-query';
import { CURRICULUM_KEYS } from './queryKeys';

/** Returns a function that refreshes every module, unit and lesson query (use in mutation onSuccess). */
export function useInvalidateCurriculum() {
   const queryClient = useQueryClient();
   return () => Promise.all(CURRICULUM_KEYS.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
}
