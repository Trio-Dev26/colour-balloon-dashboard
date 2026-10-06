'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { useModule, useModuleUnits } from '@/hooks/useModules';
import { ModuleIntroduction } from './ModuleIntroduction';
import { ModuleMetaBar } from './ModuleMetaBar';
import { ModuleNotFound } from './ModuleNotFound';
import { ModuleSummary } from './ModuleSummary';
import { ModuleUnitsSection } from './ModuleUnitsSection';

export function ModuleDetailView({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail, isPending } = useModule(moduleId);
   const { data: units = [] } = useModuleUnits(moduleId);

   if (isPending) return <ContentSkeleton />;
   if (!moduleDetail) return <ModuleNotFound />;

   return (
      <>
         <ModuleMetaBar module={moduleDetail} />
         <ModuleSummary module={moduleDetail} />
         <ModuleIntroduction module={moduleDetail} />
         <ModuleUnitsSection moduleId={moduleId} units={units} />
      </>
   );
}
