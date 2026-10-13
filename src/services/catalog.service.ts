// Fixed levels and categories (PRD D11), seeded by the backend.
import axiosApi from '@/lib/axios';
import { CATALOG_PATHS } from '@/constants/api';
import type { Taxonomy } from '@/types/api/module.types';

export async function getLevels(): Promise<Taxonomy[]> {
   return (await axiosApi.get<Taxonomy[]>(CATALOG_PATHS.levels)).data;
}

export async function getCategories(): Promise<Taxonomy[]> {
   return (await axiosApi.get<Taxonomy[]>(CATALOG_PATHS.categories)).data;
}
