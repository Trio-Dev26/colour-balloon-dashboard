'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { EntitySummary } from '@/components/common/EntitySummary';
import { useUnitLessons } from '@/hooks/useLessons';
import { useUnit } from '@/hooks/useUnits';
import { UnitLessonsSection } from './UnitLessonsSection';
import { UnitMetaBar } from './UnitMetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';

export function UnitDetailView({ unitId }: { unitId: string }) {
   const { data: unit, isPending } = useUnit(unitId);
   const { data: lessons = [] } = useUnitLessons(unitId);

   if (isPending) return <ContentSkeleton />;
   if (!unit) return <NotFoundState entityName="unit" backHref={ROUTES.units} />;

   return (
      <>
         <UnitMetaBar
            level={unit.module.level}
            category={unit.module.category}
            moduleCode={unit.module.code}
            unitCode={unit.code}
         />
         <EntitySummary titleEn={unit.titleEn} titleMy={unit.titleMy} description={unit.descriptionEn} />
         <UnitLessonsSection unit={unit} lessons={lessons} />
      </>
   );
}
