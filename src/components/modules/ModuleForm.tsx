'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormActions } from '@/components/common/form/FormActions';
import { ROUTES } from '@/constants/routes';
import { useCreateModule, useUpdateModule } from '@/hooks/useModules';
import { apiErrorMessage, toastInvalidLanguages } from '@/lib/form';
import { EMPTY_MODULE_FORM, moduleFormSchema, type ModuleFormValues } from '@/schemas/module.schema';
import { ModuleBasicFields } from './ModuleBasicFields';
import { ModuleContentFields } from './ModuleContentFields';

interface ModuleFormProps {
   title: string;
   /** Edit mode when set; create mode otherwise. */
   moduleId?: string;
   defaultValues?: ModuleFormValues;
}

// Shared by Create and Edit module (FR-CUR-002).
export function ModuleForm({ title, moduleId, defaultValues = EMPTY_MODULE_FORM }: ModuleFormProps) {
   const router = useRouter();
   const form = useForm<ModuleFormValues>({ resolver: zodResolver(moduleFormSchema), defaultValues });
   const createModule = useCreateModule();
   const updateModule = useUpdateModule(moduleId ?? '');

   // `image` isn't sent: the API has no module image yet (TODO(api), BR-16).
   const onSubmit = form.handleSubmit(async (values) => {
      const { image, ...payload } = values;
      void image;
      try {
         const saved = moduleId ? await updateModule.mutateAsync(payload) : await createModule.mutateAsync(payload);
         toast.success(moduleId ? 'Module updated' : 'Module created');
         router.push(ROUTES.moduleDetail(saved.id));
      } catch (error) {
         // Keep the form open with the user's input; the backend explains e.g. a duplicate title.
         toast.error(apiErrorMessage(error, 'Couldn’t save the module. Please try again.'));
      }
   }, toastInvalidLanguages);

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            <ModuleBasicFields />
            {/* TODO(api): render <ModuleImageField /> here once the API stores module images (BR-16). */}
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
