'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DialogForm } from '@/components/common/form/DialogForm';
import { useCreateUnit, useUpdateUnit } from '@/hooks/useUnits';
import { apiErrorMessage, toastInvalidLanguages } from '@/lib/form';
import { unitFormSchema, type UnitFormValues } from '@/schemas/unit.schema';
import { UnitFields } from './UnitFields';

interface UnitDialogFormProps {
   /** Edit mode when set. */
   unitId?: string;
   defaultValues: UnitFormValues;
   onClose: () => void;
}

// Create / Edit Unit form inside a dialog (Figma "Create Unit"). Create locks the module to the page's module;
// edit offers a move to another Draft module, like the full Edit Unit page (D28).
export function UnitDialogForm({ unitId, defaultValues, onClose }: UnitDialogFormProps) {
   const form = useForm<UnitFormValues>({ resolver: zodResolver(unitFormSchema), defaultValues });
   const createUnit = useCreateUnit();
   const updateUnit = useUpdateUnit(unitId ?? '');

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         if (unitId) await updateUnit.mutateAsync(values);
         else await createUnit.mutateAsync(values);
         toast.success(unitId ? 'Unit updated' : 'Unit created');
         onClose();
      } catch (error) {
         // Keep the dialog open with the user's input so they can retry.
         toast.error(apiErrorMessage(error, 'Couldn’t save the unit. Please try again.'));
      }
   }, toastInvalidLanguages);

   return (
      <FormProvider {...form}>
         <DialogForm
            title={unitId ? 'Edit Unit' : 'Create Unit'}
            submitLabel="Save unit"
            isSubmitting={createUnit.isPending || updateUnit.isPending}
            onSubmit={onSubmit}
            onCancel={onClose}
         >
            {unitId ? <UnitFields isEditing /> : <UnitFields isModuleLocked={Boolean(defaultValues.moduleId)} />}
         </DialogForm>
      </FormProvider>
   );
}
