/** Row in a unit's Lessons table. */
export interface LessonListItem {
   id: string;
   unitId: string;
   code: string;
   /** Unlock position within the unit, starting at 1 (FR-CUR-006). */
   order: number;
   titleEn: string;
   titleMy: string;
   studentFileCount: number;
   teacherFileCount: number;
   updatedAt: string;
}
