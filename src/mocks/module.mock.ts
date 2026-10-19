// TEMPORARY mock modules, now only so the mock units and lessons have parents (modules themselves are on
// the API). Delete together with the unit mocks when the units API exists.
import type { ModuleListItem, Taxonomy } from '@/types/api/module.types';

export type MockModuleRecord = ModuleListItem;

const MOCK_MODULE_COUNT = 40;
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

const toTaxonomy = (code: string, titleEn: string): Taxonomy => ({ id: code, code, titleEn, titleMy: '' });

const LEVELS = [toTaxonomy('FOUNDATION', 'Foundation'), toTaxonomy('BEGINNER', 'Beginner')];
const CATEGORIES = [toTaxonomy('MAIN_LESSON', 'Main Lesson'), toTaxonomy('READING', 'Reading')];

export const MOCK_MODULES: MockModuleRecord[] = Array.from({ length: MOCK_MODULE_COUNT }, (_, index) => {
   const [titleEn, titleMy] = TITLES[index % TITLES.length];
   const part = Math.floor(index / TITLES.length) + 1;
   return {
      id: `module-${index + 1}`,
      code: `M${index + 1}`,
      status: 'DRAFT',
      unitCount: 0, // only the mock lessons use these modules now
      thumbnailUrl: null,
      titleEn: part > 1 ? `${titleEn} ${part}` : titleEn,
      titleMy: part > 1 ? `${titleMy} (${part})` : titleMy,
      level: LEVELS[index % LEVELS.length],
      category: CATEGORIES[index % CATEGORIES.length],
      updatedAt: new Date(BASE_DATE - index * 7 * HOUR_MS).toISOString(),
   };
});
