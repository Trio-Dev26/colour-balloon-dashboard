'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { useModule } from '@/hooks/useModules';
import { useModuleUnits } from '@/hooks/useUnits';
import { MetaBar } from '@/components/common/MetaBar';
import { CURRICULUM_CODE_TONES, MODULE_STATUS } from '@/constants/module';
import { countLabel } from '@/lib/format';
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
         <MetaBar
            items={[
               { label: 'Module code', value: moduleDetail.code, tone: CURRICULUM_CODE_TONES.module },
               { label: 'Level', value: moduleDetail.level.titleEn, tone: 'success' },
               { label: 'Category', value: moduleDetail.category.titleEn, tone: 'info' },
               {
                  label: 'Status',
                  value: MODULE_STATUS[moduleDetail.status].label,
                  tone: MODULE_STATUS[moduleDetail.status].tone,
               },
               { label: 'Units', value: countLabel(units.length, 'unit') },
            ]}
         />
         <ModuleSummary module={moduleDetail} />
         <ModuleUnitsSection moduleId={moduleId} moduleStatus={moduleDetail.status} units={units} />
      </>
   );
}
