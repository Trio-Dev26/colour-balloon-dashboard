'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormActions } from '@/components/common/form/FormActions';
import { ROUTES } from '@/constants/routes';
import { EMPTY_MODULE_FORM, moduleFormSchema, type ModuleFormValues } from '@/schemas/module.schema';
import { ModuleBasicFields } from './ModuleBasicFields';
import { ModuleContentFields } from './ModuleContentFields';
import { ModuleImageField } from './ModuleImageField';

interface ModuleFormProps {
   title: string;
   defaultValues?: ModuleFormValues;
}

// Shared by Create and Edit module (FR-CUR-002).
export function ModuleForm({ title, defaultValues = EMPTY_MODULE_FORM }: ModuleFormProps) {
   const form = useForm<ModuleFormValues>({ resolver: zodResolver(moduleFormSchema), defaultValues });

   // TODO(api): call useSaveModule().mutate(values) once POST/PATCH /modules exists.
   const onSubmit = () => {};

   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            <ModuleBasicFields />
            <ModuleImageField />
            <ModuleContentFields />
            <FormActions
               cancelHref={ROUTES.modules}
               submitLabel="Save module"
               isSubmitting={form.formState.isSubmitting}
            />
         </form>
      </FormProvider>
   );
}
