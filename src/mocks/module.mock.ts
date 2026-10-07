// TEMPORARY mock data for the module screens until the NestJS module API exists.
// Only services/module.service.ts imports this file; delete both together when binding the API.
import { MODULE_CATEGORY_OPTIONS, MODULE_LEVEL_OPTIONS } from '@/constants/module';
import type { SelectOption } from '@/types/ui/common.types';
import type { ModuleListItem, ModuleStatus, Taxonomy } from '@/types/api/module.types';

const MOCK_MODULE_COUNT = 40;
const MAX_MOCK_UNITS = 9;
const STATUSES: ModuleStatus[] = ['PUBLISHED', 'PUBLISHED', 'DRAFT', 'UNPUBLISHED'];
const BASE_DATE = Date.UTC(2027, 7, 12, 5, 52); // 12 Aug 2027
const HOUR_MS = 60 * 60 * 1000;

const TITLES: [en: string, my: string][] = [
   ['Foundations of Myanmar Language', 'မြန်မာဘာသာစကား၏ အခြေခံများ'],
   ['Myanmar Consonants', 'မြန်မာ ဗျည်းများ'],
   ['Myanmar Vowels', 'မြန်မာ သရများ'],
   ['Reading Simple Words', 'ရိုးရှင်းသော စကားလုံးများ ဖတ်ခြင်း'],
   ['Writing Basic Sentences', 'အခြေခံ ဝါကျများ ရေးခြင်း'],
   ['Everyday Speaking', 'နေ့စဉ်သုံး စကားပြော'],
   ['Grammar Basics', 'သဒ္ဒါ အခြေခံ'],
   ['Poems for Kids', 'ကလေးကဗျာများ'],
   ['Numbers and Counting', 'ဂဏန်းများနှင့် ရေတွက်ခြင်း'],
   ['Family and Friends', 'မိသားစုနှင့် သူငယ်ချင်းများ'],
];

const toTaxonomy = (option: SelectOption): Taxonomy => ({
   id: option.value,
   code: option.value,
   titleEn: option.label,
   titleMy: '',
});

export const MOCK_MODULES: ModuleListItem[] = Array.from({ length: MOCK_MODULE_COUNT }, (_, index) => {
   const [titleEn, titleMy] = TITLES[index % TITLES.length];
   const part = Math.floor(index / TITLES.length) + 1;
   return {
      id: `module-${index + 1}`,
      code: `M${index + 1}`,
      titleEn: part > 1 ? `${titleEn} ${part}` : titleEn,
      titleMy: part > 1 ? `${titleMy} (${part})` : titleMy,
      unitCount: index % MAX_MOCK_UNITS, // 0..8; modules 1, 10, 19, … have no units (empty state)
      level: toTaxonomy(MODULE_LEVEL_OPTIONS[index % MODULE_LEVEL_OPTIONS.length]),
      category: toTaxonomy(MODULE_CATEGORY_OPTIONS[index % MODULE_CATEGORY_OPTIONS.length]),
      status: STATUSES[index % STATUSES.length],
      updatedAt: new Date(BASE_DATE - index * 7 * HOUR_MS).toISOString(),
   };
});
