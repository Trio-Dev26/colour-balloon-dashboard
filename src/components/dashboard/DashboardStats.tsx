import { BookIcon, FolderOpenIcon, NotebookTextIcon, RocketIcon } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { ROUTES } from '@/constants/routes';
import type { CurriculumOverview } from '@/types/api/dashboard.types';

const PERCENT = 100;

// The four headline numbers; each card opens the matching list.
export function DashboardStats({ overview }: { overview: CurriculumOverview }) {
   const { moduleTotal, statusCounts, unitTotal, lessonTotal, lessonsWithoutMaterials } = overview;
   const published = statusCounts.PUBLISHED;
   const publishedShare = moduleTotal ? Math.round((published / moduleTotal) * PERCENT) : 0;
   const missing = lessonsWithoutMaterials.length;

   return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
         <StatCard
            label="Modules"
            value={moduleTotal}
            icon={FolderOpenIcon}
            hint={`${statusCounts.DRAFT} in draft`}
            href={ROUTES.modules}
         />
         <StatCard
            label="Live modules"
            value={published}
            icon={RocketIcon}
            tone="success"
            hint={`${publishedShare}% of all modules are published`}
            href={`${ROUTES.modules}?status=PUBLISHED`}
         />
         <StatCard
            label="Units"
            value={unitTotal}
            icon={BookIcon}
            tone="info"
            hint="Across all modules"
            href={ROUTES.units}
         />
         <StatCard
            label="Lessons"
            value={lessonTotal}
            icon={NotebookTextIcon}
            tone="warning"
            hint={
               missing > 0 ? (
                  <span className="text-warning-foreground">
                     {missing} still {missing === 1 ? 'needs' : 'need'} student materials
                  </span>
               ) : (
                  'All have student materials'
               )
            }
            href={ROUTES.lessons}
         />
      </div>
   );
}
