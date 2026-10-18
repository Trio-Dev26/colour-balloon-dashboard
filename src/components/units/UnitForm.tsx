'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormActions } from '@/components/common/form/FormActions';
import { ROUTES } from '@/constants/routes';
import { useCreateUnit, useUpdateUnit } from '@/hooks/useUnits';
import { apiErrorMessage, toastInvalidLanguages } from '@/lib/form';
import { EMPTY_UNIT_FORM, unitFormSchema, type UnitFormValues } from '@/schemas/unit.schema';
import { UnitFields } from './UnitFields';

interface UnitFormProps {
   title: string;
   /** Edit mode when set. */
   unitId?: string;
   defaultValues?: UnitFormValues;
}

// Full-page Create / Edit unit form (Figma "Create New Unit").
export function UnitForm({ title, unitId, defaultValues = EMPTY_UNIT_FORM }: UnitFormProps) {
   const router = useRouter();
   const form = useForm<UnitFormValues>({ resolver: zodResolver(unitFormSchema), defaultValues });
   const createUnit = useCreateUnit();
   const updateUnit = useUpdateUnit(unitId ?? '');
   const backHref = unitId ? ROUTES.unitDetail(unitId) : ROUTES.units;

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         if (unitId) await updateUnit.mutateAsync(values);
         else await createUnit.mutateAsync(values);
         toast.success(unitId ? 'Unit updated' : 'Unit created');
         router.push(backHref);
      } catch (error) {
         // Keep the form open with the user's input so they can retry (e.g. 409 when a move breaks D28).
         toast.error(apiErrorMessage(error, 'Couldn’t save the unit. Please try again.'));
      }
   }, toastInvalidLanguages);

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            {/* Picking another module on edit moves the unit to the end of that module (Draft modules only, D28). */}
            <UnitFields moduleFieldClassName="max-w-110" isEditing={Boolean(unitId)} />
            <FormActions
               cancelHref={backHref}
               submitLabel="Save unit"
               isSubmitting={createUnit.isPending || updateUnit.isPending}
            />
         </form>
      </FormProvider>
   );
}
