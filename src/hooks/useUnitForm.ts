import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { EMPTY_UNIT_FORM, unitFormSchema, type UnitFormValues } from '@/schemas/unit.schema';
import { useCreateUnit, useUpdateUnit } from './useUnits';

interface UseUnitFormOptions {
   /** Edit mode when set; create mode otherwise. */
   unitId?: string;
   defaultValues?: Partial<UnitFormValues>;
   onSaved: () => void;
}

/** Form state + submit for creating or editing a unit (page form and Create Unit dialog). */
export function useUnitForm({ unitId, defaultValues, onSaved }: UseUnitFormOptions) {
   const form = useForm<UnitFormValues>({
      resolver: zodResolver(unitFormSchema),
      defaultValues: { ...EMPTY_UNIT_FORM, ...defaultValues },
   });
   const createUnit = useCreateUnit();
   const updateUnit = useUpdateUnit(unitId ?? '');

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         if (unitId) {
            await updateUnit.mutateAsync(values);
            toast.success('Unit updated');
         } else {
            await createUnit.mutateAsync(values);
            toast.success('Unit created');
         }
         onSaved();
      } catch {
         // Keep the form open with the user's input so they can retry.
         toast.error('Couldn’t save the unit. Please try again.');
      }
   });

   return { form, onSubmit, isSaving: createUnit.isPending || updateUnit.isPending };
}
