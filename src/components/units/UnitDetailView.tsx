'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { EntitySummary } from '@/components/common/EntitySummary';
import { useUnitLessons } from '@/hooks/useLessons';
import { useUnit } from '@/hooks/useUnits';
import { UnitLessonsSection } from './UnitLessonsSection';
import { LevelCategoryBar } from '@/components/modules/LevelCategoryBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';

export function UnitDetailView({ unitId }: { unitId: string }) {
   const { data: unit, isPending } = useUnit(unitId);
   const { data: lessons = [] } = useUnitLessons(unitId);

   if (isPending) return <ContentSkeleton />;
   if (!unit) return <NotFoundState entityName="unit" backHref={ROUTES.units} />;

   return (
      <>
         <LevelCategoryBar level={unit.module.level} category={unit.module.category} />
         <EntitySummary
            titleEn={unit.titleEn}
            titleMy={unit.titleMy}
            descriptionEn={unit.descriptionEn}
            descriptionMy={unit.descriptionMy}
         />
         <UnitLessonsSection unit={unit} lessons={lessons} />
      </>
   );
}
