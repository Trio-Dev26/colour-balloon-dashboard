'use client';

import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import { FormActions } from '@/components/common/form/FormActions';
import { ROUTES } from '@/constants/routes';
import { useUnitForm } from '@/hooks/useUnitForm';
import type { UnitFormValues } from '@/schemas/unit.schema';
import { UnitFields } from './UnitFields';

interface UnitFormProps {
   title: string;
   /** Edit mode when set. */
   unitId?: string;
   defaultValues?: UnitFormValues;
}

// Full-page Create / Edit unit form (Figma "Create New Unit").
export function UnitForm({ title, unitId, defaultValues }: UnitFormProps) {
   const router = useRouter();
   const { form, onSubmit, isSaving } = useUnitForm({
      unitId,
      defaultValues,
      onSaved: () => router.push(unitId ? ROUTES.unitDetail(unitId) : ROUTES.units),
   });

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            <UnitFields moduleFieldClassName="max-w-110" />
            <FormActions
               cancelHref={unitId ? ROUTES.unitDetail(unitId) : ROUTES.units}
               submitLabel="Save unit"
               isSubmitting={isSaving}
            />
         </form>
      </FormProvider>
   );
}
