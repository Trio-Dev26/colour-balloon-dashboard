'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { useModule } from '@/hooks/useModules';
import { useModuleUnits } from '@/hooks/useUnits';
import { ModuleIntroduction } from './ModuleIntroduction';
import { ModuleMetaBar } from './ModuleMetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';
import { ModuleSummary } from './ModuleSummary';
import { ModuleUnitsSection } from '@/components/units/ModuleUnitsSection';

export function ModuleDetailView({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail, isPending } = useModule(moduleId);
   const { data: units = [] } = useModuleUnits(moduleId);

   if (isPending) return <ContentSkeleton />;
   if (!moduleDetail) return <NotFoundState entityName="module" backHref={ROUTES.modules} />;

   return (
      <>
         <ModuleMetaBar module={moduleDetail} />
         <ModuleSummary module={moduleDetail} />
         <ModuleIntroduction module={moduleDetail} />
         <ModuleUnitsSection moduleId={moduleId} moduleStatus={moduleDetail.status} units={units} />
      </>
   );
}
