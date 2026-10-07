// TEMPORARY mock detail content for the module screens until the NestJS module API exists.
// Only services/ import from src/mocks; delete the folder when binding the API.
import type { ModuleDetail, ModuleListItem } from '@/types/api/module.types';

const MOCK_COVER_URL = '/images/mock/module-cover.svg';

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
