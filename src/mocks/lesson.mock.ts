// TEMPORARY mock lessons until the NestJS lesson API exists. Only services/ import from src/mocks.
import type { LessonListItem } from '@/types/api/lesson.types';
import type { MockUnitRecord } from './unit.mock';

const MAX_LESSONS_PER_UNIT = 5; // units get 0..4 lessons ("-" in the unit list when 0)
const MAX_FILES = 3;
const HOUR_MS = 60 * 60 * 1000;

const LESSON_TITLES: [en: string, my: string][] = [
   ['Lesson 1', 'မြန်မာဘာသာစကား၏ အခြေခံများ'],
   ['Consonant Combinations', 'ဗျည်းပေါင်းစပ်မှုများ'],
   ['Vowel Symbols and Tonal Markers', 'သရသင်္ကေတများနှင့် အသံထွက်အမှတ်အသားများ'],
   ['Reading Practice', 'ဖတ်စာ လေ့ကျင့်ခန်း'],
];

export function buildMockLessons(units: MockUnitRecord[]): LessonListItem[] {
   return units.flatMap((unit, unitIndex) =>
      Array.from({ length: unitIndex % MAX_LESSONS_PER_UNIT }, (_, index) => {
         const [titleEn, titleMy] = LESSON_TITLES[index % LESSON_TITLES.length];
         return {
            id: `${unit.id}-lesson-${index + 1}`,
            unitId: unit.id,
            code: `L${index + 1}`,
            order: index + 1,
            titleEn,
            titleMy,
            studentFileCount: (index % MAX_FILES) + 1,
            teacherFileCount: ((index + 1) % MAX_FILES) + 1,
            updatedAt: new Date(new Date(unit.updatedAt).getTime() - index * HOUR_MS).toISOString(),
         };
      })
   );
}
