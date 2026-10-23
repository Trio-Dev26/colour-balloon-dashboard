'use client';

import { Button } from '@/components/ui/button';
import { useCurriculumOverview } from '@/hooks/useDashboard';
import { DashboardSkeleton } from './DashboardSkeleton';
import { DashboardStats } from './DashboardStats';
import { NeedsAttentionCard } from './NeedsAttentionCard';
import { PublishingStatusCard } from './PublishingStatusCard';
import { RecentModulesCard } from './RecentModulesCard';
import { ReportsComingSoonCard } from './ReportsComingSoonCard';
import { WelcomeBanner } from './WelcomeBanner';

// Admin home: greeting, curriculum numbers, recent work, what needs fixing, and the reports still to come.
export function DashboardView() {
   const { data: overview, isPending, isError, refetch } = useCurriculumOverview();

   if (isPending) return <DashboardSkeleton />;
   if (isError) {
      return (
         <div className="flex flex-col items-center gap-3 rounded-xl border p-10 text-sm text-muted-foreground">
            Couldn&apos;t load the dashboard.
            <Button variant="outline" onClick={() => refetch()}>
               Try again
            </Button>
         </div>
      );
   }

   return (
      <>
         <WelcomeBanner draftCount={overview.statusCounts.DRAFT} />
         <DashboardStats overview={overview} />
         <div className="grid gap-6 lg:grid-cols-3">
            <RecentModulesCard modules={overview.recentModules} />
            <div className="flex flex-col gap-6">
               <PublishingStatusCard total={overview.moduleTotal} counts={overview.statusCounts} />
               <NeedsAttentionCard lessons={overview.lessonsWithoutMaterials} />
            </div>
         </div>
         <ReportsComingSoonCard />
      </>
   );
}
