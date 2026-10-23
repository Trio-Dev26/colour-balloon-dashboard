import { useQuery } from '@tanstack/react-query';
import { getCurriculumOverview } from '@/services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export function useCurriculumOverview() {
   return useQuery({ queryKey: dashboardKeys.curriculum(), queryFn: getCurriculumOverview });
}
