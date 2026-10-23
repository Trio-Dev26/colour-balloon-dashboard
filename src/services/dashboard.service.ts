// Admin dashboard data. No dashboard endpoint yet, so it is put together from the module and lesson lists.
import type { CurriculumOverview } from '@/types/api/dashboard.types';
import type { ModuleStatus } from '@/types/api/module.types';
import { getLessonSample } from './lesson.service';
import { getModuleSample } from './module.service';

const byNewest = (a: { updatedAt: string }, b: { updatedAt: string }) => b.updatedAt.localeCompare(a.updatedAt);

// ponytail: counts per status, units and missing materials only cover the first 100 modules / lessons;
// move to a GET /admin/dashboard endpoint once there are more (or once Q25 settles the reports).
export async function getCurriculumOverview(): Promise<CurriculumOverview> {
   const [modules, lessons] = await Promise.all([getModuleSample(), getLessonSample()]);

   const statusCounts: Record<ModuleStatus, number> = { DRAFT: 0, PUBLISHED: 0, UNPUBLISHED: 0 };
   for (const { status } of modules.items) statusCounts[status] += 1;

   return {
      moduleTotal: modules.total,
      statusCounts,
      unitTotal: modules.items.reduce((sum, { unitCount }) => sum + unitCount, 0),
      lessonTotal: lessons.total,
      recentModules: [...modules.items].sort(byNewest),
      lessonsWithoutMaterials: lessons.items.filter((lesson) => lesson.fileCounts.student === 0).sort(byNewest),
   };
}
