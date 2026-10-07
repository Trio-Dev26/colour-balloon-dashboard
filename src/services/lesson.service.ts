// Lesson API calls. Mock-backed until the NestJS lesson endpoints exist.
//
// TODO(api): replace each function body with the axios call in its comment, then delete src/mocks/.
import { mockDb, mockDelay } from '@/mocks/db.mock';
import type { LessonListItem } from '@/types/api/lesson.types';

/** (await axiosApi.get<LessonListItem[]>(`/units/${unitId}/lessons`)).data — in unlock order. */
export async function getUnitLessons(unitId: string): Promise<LessonListItem[]> {
   await mockDelay();
   return mockDb.lessons.filter((lesson) => lesson.unitId === unitId).sort((a, b) => a.order - b.order);
}

/** await axiosApi.put(`/units/${unitId}/lessons/order`, { lessonIds }) — the order is the unlock order. */
export async function reorderUnitLessons(unitId: string, lessonIds: string[]): Promise<void> {
   await mockDelay();
   mockDb.lessons = mockDb.lessons.map((lesson) =>
      lesson.unitId === unitId ? { ...lesson, order: lessonIds.indexOf(lesson.id) + 1 } : lesson
   );
}

/** await axiosApi.delete(`/lessons/${id}`) */
export async function deleteLesson(id: string): Promise<void> {
   await mockDelay();
   mockDb.lessons = mockDb.lessons.filter((lesson) => lesson.id !== id);
}
