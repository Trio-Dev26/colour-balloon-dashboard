'use client';

import { ContentCard } from '@/components/common/ContentCard';
import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { MetaBar } from '@/components/common/MetaBar';
import { NotFoundState } from '@/components/common/NotFoundState';
import { CURRICULUM_CODE_TONES, MODULE_STATUS } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useUnitLessons } from '@/hooks/useLessons';
import { useUnit } from '@/hooks/useUnits';
import { countLabel } from '@/lib/format';
import { UnitLessonsSection } from './UnitLessonsSection';

// Unit details: codes, its module's level, category and status across the top, the bilingual content card,
// then its lessons.
export function UnitDetailView({ unitId }: { unitId: string }) {
   const { data: unit, isPending } = useUnit(unitId);
   const { data: lessons = [] } = useUnitLessons(unitId);

   if (isPending) return <ContentSkeleton />;
   if (!unit) return <NotFoundState entityName="unit" backHref={ROUTES.units} />;

   const status = MODULE_STATUS[unit.moduleStatus];
   return (
      <>
         <MetaBar
            items={[
               { label: 'Unit code', value: unit.code, tone: CURRICULUM_CODE_TONES.unit },
               { label: 'Module', value: unit.moduleCode, tone: CURRICULUM_CODE_TONES.module },
               { label: 'Level', value: unit.module.level.titleEn, tone: 'success' },
               { label: 'Category', value: unit.module.category.titleEn, tone: 'info' },
               { label: 'Module status', value: status.label, tone: status.tone },
               { label: 'Lessons', value: countLabel(lessons.length, 'lesson') },
            ]}
         />
         <ContentCard
            titleEn={unit.titleEn}
            titleMy={unit.titleMy}
            descriptionEn={unit.descriptionEn}
            descriptionMy={unit.descriptionMy}
         />
         <UnitLessonsSection unit={unit} lessons={lessons} />
      </>
   );
}
