'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { apiErrorMessage } from '@/lib/form';
import { BilingualText } from '@/components/common/BilingualText';
import { CreateButton } from '@/components/common/CreateButton';
import { InfoAlert } from '@/components/common/InfoAlert';
import { OrderBadge } from '@/components/common/OrderBadge';
import { OrderedChildrenSection } from '@/components/common/ordered/OrderedChildrenSection';
import { ToneBadge } from '@/components/common/ToneBadge';
import { MODULE_RULE_HINTS } from '@/constants/module';
import { useDeleteUnit, useReorderModuleUnits } from '@/hooks/useUnits';
import type { ModuleStatus } from '@/types/api/module.types';
import type { UnitListItem } from '@/types/api/unit.types';
import { CreateUnitDialog } from './CreateUnitDialog';
import { getModuleUnitColumns } from './moduleUnitColumns';
import { UnitEmptyState } from './UnitEmptyState';

interface ModuleUnitsSectionProps {
   moduleId: string;
   moduleStatus: ModuleStatus;
   units: UnitListItem[];
}

// Units section of the module detail page: table, "Arrange units" and the Create Unit dialog.
export function ModuleUnitsSection({ moduleId, moduleStatus, units }: ModuleUnitsSectionProps) {
   const [isCreateOpen, setIsCreateOpen] = useState(false);
   const reorder = useReorderModuleUnits(moduleId);
   const { mutate: deleteUnit } = useDeleteUnit();
   const columns = useMemo(
      () =>
         getModuleUnitColumns((unit) =>
            deleteUnit(unit.id, {
               onSuccess: () => toast.success(`${unit.titleEn} deleted`),
               // e.g. 409 when the module was published meanwhile (D18)
               onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${unit.titleEn}.`)),
            })
         ),
      [deleteUnit]
   );
   const createButton = <CreateButton label="Create unit" onClick={() => setIsCreateOpen(true)} />;

   return (
      <>
         <OrderedChildrenSection
            title="Units"
            description="The first unit is automatically available. Each following unit unlocks when the learner completes the previous unit."
            createAction={createButton}
            alert={
               <InfoAlert>
                  The first unit is available automatically. Each next unit unlocks when the previous unit is completed.
               </InfoAlert>
            }
            items={units}
            columns={columns}
            getId={(unit) => unit.id}
            emptyState={<UnitEmptyState title="No units yet!" action={createButton} />}
            arrange={{
               buttonLabel: 'Arrange units',
               // D28: a published module's unit order is locked.
               disabledReason: moduleStatus === 'DRAFT' ? undefined : MODULE_RULE_HINTS.reorderLocked,
               hint: 'Drag units by the handle to change the order learners unlock them in. Unit 1 is always open first.',
               isSaving: reorder.isPending,
               getHandleLabel: (unit, index) => `Move unit ${index + 1}: ${unit.titleEn}`,
               renderItem: (unit, index) => (
                  <>
                     <OrderBadge order={index + 1} />
                     <BilingualText en={unit.titleEn} my={unit.titleMy} />
                     {index === 0 && <ToneBadge tone="primary">First unit</ToneBadge>}
                     <span className="ml-auto text-sm text-muted-foreground">{unit.code}</span>
                  </>
               ),
               onSave: (ids) => reorder.mutateAsync(ids).then(() => toast.success('Unit order saved')),
            }}
         />
         <CreateUnitDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} moduleId={moduleId} />
      </>
   );
}
