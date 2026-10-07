// TEMPORARY mock units until the NestJS unit API exists. Only services/ import from src/mocks.
import type { ModuleListItem } from '@/types/api/module.types';

/** What the mock "database" stores for a unit; lessonCount and moduleCode are derived on read. */
export interface MockUnitRecord {
   id: string;
   moduleId: string;
   code: string;
   order: number;
   titleEn: string;
   titleMy: string;
   descriptionEn: string;
   descriptionMy: string;
   updatedAt: string;
}

const MAX_UNITS_PER_MODULE = 9; // modules get 0..8 units, so some show the empty state
const HOUR_MS = 60 * 60 * 1000;

const UNIT_TITLES: [en: string, my: string][] = [
   ['Recognize consonants and vowels', 'မြန်မာဗျည်းအက္ခရာနှင့် သရမိတ်ဆက်'],
   ['Vowel pattern', 'အ၊ အာ၊ အား'],
   ['Writing first letters', 'ပထမဆုံး အက္ခရာများ ရေးခြင်း'],
   ['Sounds and syllables', 'အသံနှင့် ဝဏ္ဏများ'],
   ['Simple words', 'ရိုးရှင်းသော စကားလုံးများ'],
   ['Reading short sentences', 'ဝါကျတိုများ ဖတ်ခြင်း'],
   ['Everyday greetings', 'နေ့စဉ် နှုတ်ဆက်စကား'],
   ['Review and practice', 'ပြန်လည်လေ့ကျင့်ခြင်း'],
];

export function buildMockUnits(modules: ModuleListItem[]): MockUnitRecord[] {
   return modules.flatMap((module, moduleIndex) =>
      Array.from({ length: moduleIndex % MAX_UNITS_PER_MODULE }, (_, index) => {
         const [titleEn, titleMy] = UNIT_TITLES[index % UNIT_TITLES.length];
         return {
            id: `${module.id}-unit-${index + 1}`,
            moduleId: module.id,
            code: `U${index + 1}`,
            order: index + 1,
            titleEn,
            titleMy,
            descriptionEn: `<p>This unit helps learners practise “${titleEn.toLowerCase()}” step by step.</p>`,
            descriptionMy: '<p>ဤယူနစ်သည် ကလေးများကို အဆင့်လိုက် လေ့ကျင့်နိုင်ရန် ကူညီပေးပါသည်။</p>',
            updatedAt: new Date(new Date(module.updatedAt).getTime() - index * HOUR_MS).toISOString(),
         };
      })
   );
}
