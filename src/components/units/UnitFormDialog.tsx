'use client';

import { DialogLoadState } from '@/components/common/DialogLoadState';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useUnit } from '@/hooks/useUnits';
import { EMPTY_UNIT_FORM, unitToFormValues } from '@/schemas/unit.schema';
import { UnitDialogForm } from './UnitDialogForm';

interface UnitFormDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   /** Create: the module the new unit goes into (the module detail page's). */
   moduleId: string;
   /** Edit this unit instead of creating one. */
   unitId?: string;
}

// Create / Edit Unit dialog on the module detail page.
export function UnitFormDialog({ open, onOpenChange, moduleId, unitId }: UnitFormDialogProps) {
   const close = () => onOpenChange(false);

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent showCloseButton={false} className="gap-0 p-0 sm:max-w-175">
            {/* Remounting on open gives a fresh form each time. */}
            {open &&
               (unitId ? (
                  <EditUnitDialogBody unitId={unitId} onClose={close} />
               ) : (
                  <UnitDialogForm defaultValues={{ ...EMPTY_UNIT_FORM, moduleId }} onClose={close} />
               ))}
         </DialogContent>
      </Dialog>
   );
}

// Loads the unit, then opens the form pre-filled with its values.
function EditUnitDialogBody({ unitId, onClose }: { unitId: string; onClose: () => void }) {
   const { data: unit, isPending } = useUnit(unitId);

   if (!unit) {
      return <DialogLoadState title="Edit Unit" isLoading={isPending} missingMessage="This unit no longer exists." />;
   }
   return <UnitDialogForm unitId={unitId} defaultValues={unitToFormValues(unit)} onClose={onClose} />;
}
