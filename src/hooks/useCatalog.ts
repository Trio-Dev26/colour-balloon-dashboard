import { useQuery } from '@tanstack/react-query';
import { getCategories, getLevels } from '@/services/catalog.service';
import type { Taxonomy } from '@/types/api/module.types';
import type { SelectOption } from '@/types/ui/common.types';
import { catalogKeys } from './queryKeys';

const toOptions = (items: Taxonomy[]): SelectOption[] => items.map((item) => ({ value: item.id, label: item.titleEn }));

// Fixed system values (PRD D11): fetched once per session.
export function useLevelOptions(): SelectOption[] {
   const { data = [] } = useQuery({ queryKey: catalogKeys.levels(), queryFn: getLevels, staleTime: Infinity });
   return toOptions(data);
}

export function useCategoryOptions(): SelectOption[] {
   const { data = [] } = useQuery({ queryKey: catalogKeys.categories(), queryFn: getCategories, staleTime: Infinity });
   return toOptions(data);
}
