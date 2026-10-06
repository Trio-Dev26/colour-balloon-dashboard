// TEMPORARY mock detail content and units for the module screens until the NestJS module API exists.
// Only services/module.service.ts imports this file; delete it with the other mocks when binding the API.
import type { ModuleDetail, ModuleListItem, UnitSummary } from '@/types/api/module.types';

const MOCK_COVER_URL = '/images/mock/module-cover.svg';
const LESSONS_PER_UNIT = 3;
const HOUR_MS = 60 * 60 * 1000;

const UNIT_TITLES: [en: string, my: string][] = [
   ['Recognize consonants and vowels', 'မြန်မာဗျည်းအက္ခရာနှင့် သရမိတ်ဆက်'],
   ['Writing first letters', 'ပထမဆုံး အက္ခရာများ ရေးခြင်း'],
   ['Sounds and syllables', 'အသံနှင့် ဝဏ္ဏများ'],
   ['Simple words', 'ရိုးရှင်းသော စကားလုံးများ'],
   ['Reading short sentences', 'ဝါကျတိုများ ဖတ်ခြင်း'],
   ['Everyday greetings', 'နေ့စဉ် နှုတ်ဆက်စကား'],
   ['Colours and shapes', 'အရောင်နှင့် ပုံသဏ္ဌာန်များ'],
   ['Review and practice', 'ပြန်လည်လေ့ကျင့်ခြင်း'],
];

/** Full detail for a list item: same fields plus description, goal, outcome and cover image. */
export function buildMockModuleDetail(module: ModuleListItem, index: number): ModuleDetail {
   return {
      ...module,
      // Every third module has no image, to show the empty image states.
      imageUrl: index % 3 === 2 ? null : MOCK_COVER_URL,
      descriptionEn: `<p>${module.titleEn} helps learners identify and understand basic consonants and vowels in the Myanmar language.</p>`,
      descriptionMy: '<p>ဤသင်ခန်းစာသည် ကလေးများကို မြန်မာ ဗျည်းနှင့် သရများကို မှတ်မိ နားလည်စေရန် ကူညီပေးပါသည်။</p>',
      learningGoalEn: 'Recognize, read and write the basic Myanmar letters with confidence.',
      learningGoalMy: 'မြန်မာ အခြေခံ အက္ခရာများကို ယုံကြည်စွာ မှတ်မိ ဖတ်ရှု ရေးသားနိုင်ရန်။',
      learningOutcomeEn:
         '<p>By the end of this module, learners will be able to:</p><ul><li>recognize and write basic Myanmar letters and syllables</li><li>understand simple sentence structures and everyday vocabulary</li><li>read short texts and write a few sentences about themselves</li></ul>',
      learningOutcomeMy:
         '<p>ဤသင်ခန်းစာ ပြီးဆုံးပါက ကလေးများသည် -</p><ul><li>မြန်မာ အက္ခရာနှင့် ဝဏ္ဏများကို ဖတ်ရှု ရေးသားနိုင်မည်</li><li>ရိုးရှင်းသော ဝါကျများကို နားလည်နိုင်မည်</li><li>မိမိအကြောင်း ဝါကျတိုများ ရေးနိုင်မည်</li></ul>',
   };
}

/** One unit per module.unitCount, in unlock order. */
export function buildMockUnits(module: ModuleListItem): UnitSummary[] {
   return Array.from({ length: module.unitCount }, (_, index) => {
      const [titleEn, titleMy] = UNIT_TITLES[index % UNIT_TITLES.length];
      return {
         id: `${module.id}-unit-${index + 1}`,
         order: index + 1,
         code: `${module.code}-U${index + 1}`,
         titleEn,
         titleMy,
         lessonCount: LESSONS_PER_UNIT,
         updatedAt: new Date(new Date(module.updatedAt).getTime() - index * HOUR_MS).toISOString(),
      };
   });
}
