'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { useUnit } from '@/hooks/useUnits';
import { unitToFormValues } from '@/schemas/unit.schema';
import { UnitForm } from './UnitForm';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';

// Loads the unit, then opens the shared form pre-filled with its values.
export function UnitEditView({ unitId }: { unitId: string }) {
   const { data: unit, isPending } = useUnit(unitId);

   if (isPending) return <ContentSkeleton />;
   if (!unit) return <NotFoundState entityName="unit" backHref={ROUTES.units} />;

   return (
      <UnitForm
         title="Edit Unit"
         unitId={unitId}
         defaultValues={unitToFormValues(unit)}
         isLive={unit.moduleStatus === 'PUBLISHED'}
      />
   );
}
