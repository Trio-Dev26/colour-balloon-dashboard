'use client';

import { DeleteEntityButton } from '@/components/common/DeleteEntityButton';
import { EditPageButton } from '@/components/common/EditPageButton';
import { ROUTES } from '@/constants/routes';
import { useDeleteUnit, useUnit } from '@/hooks/useUnits';

// Delete + "Edit unit info" in the unit detail header; hidden while loading or when the unit doesn't exist.
export function UnitDetailActions({ unitId }: { unitId: string }) {
   const { data: unit } = useUnit(unitId);
   const { mutateAsync: deleteUnit } = useDeleteUnit();
   if (!unit) return null;

   const lessons = `${unit.lessonCount} lesson${unit.lessonCount === 1 ? '' : 's'}`;
   return (
      <>
         <DeleteEntityButton
            entityName="unit"
            name={`${unit.code} · ${unit.titleEn}`}
            description={`The unit and its ${lessons}, quizzes and questions will be hidden from admins and learners. This can’t be undone from the dashboard.`}
            onDelete={() => deleteUnit(unitId)}
            redirectTo={ROUTES.units}
         />
         <EditPageButton href={ROUTES.editUnit(unitId)} label="Edit unit info" />
      </>
   );
}
