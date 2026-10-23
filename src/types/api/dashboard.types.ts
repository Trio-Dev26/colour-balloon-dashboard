// Curriculum numbers for the admin dashboard, built from the module and lesson lists.
import type { LessonListItem } from './lesson.types';
import type { ModuleListItem, ModuleStatus } from './module.types';

export interface CurriculumOverview {
   moduleTotal: number;
   statusCounts: Record<ModuleStatus, number>;
   unitTotal: number;
   lessonTotal: number;
   /** Most recently updated first. */
   recentModules: ModuleListItem[];
   /** Lessons students would open to an empty page: no student files yet. */
   lessonsWithoutMaterials: LessonListItem[];
}
