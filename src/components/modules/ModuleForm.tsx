'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormActions } from '@/components/common/form/FormActions';
import { InfoAlert } from '@/components/common/InfoAlert';
import { LIVE_EDIT_NOTES } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useCreateModule, useSetModuleThumbnail, useUpdateModule } from '@/hooks/useModules';
import { apiErrorMessage, toastInvalidLanguages } from '@/lib/form';
import { EMPTY_MODULE_FORM, moduleFormSchema, type ModuleFormValues } from '@/schemas/module.schema';
import { ModuleBasicFields } from './ModuleBasicFields';
import { ModuleContentFields } from './ModuleContentFields';
import { ModuleLivePreview } from './ModuleLivePreview';

interface ModuleFormProps {
   title: string;
   /** Edit mode when set; create mode otherwise. */
   moduleId?: string;
   defaultValues?: ModuleFormValues;
   /** Edit mode: a live module's changes reach learners as soon as they're saved. */
   isLive?: boolean;
}

// Shared by Create and Edit module (FR-CUR-002): SETTINGS and CONTENT cards, with a live preview beside them
// on wide screens.
export function ModuleForm({ title, moduleId, defaultValues = EMPTY_MODULE_FORM, isLive }: ModuleFormProps) {
   const router = useRouter();
   const form = useForm<ModuleFormValues>({ resolver: zodResolver(moduleFormSchema), defaultValues });
   const createModule = useCreateModule();
   const updateModule = useUpdateModule(moduleId ?? '');
   const setThumbnail = useSetModuleThumbnail();

   // The text saves first; the image is its own upload, sent only when it changed.
   const onSubmit = form.handleSubmit(async (values) => {
      const { image, ...payload } = values;
      let saved;
      try {
         saved = moduleId ? await updateModule.mutateAsync(payload) : await createModule.mutateAsync(payload);
      } catch (error) {
         // Keep the form open with the user's input; the backend explains e.g. a duplicate title.
         toast.error(apiErrorMessage(error, 'Couldn’t save the module. Please try again.'));
         return;
      }

      // A File is new; null after a saved image means it was removed; a string is the saved image, unchanged.
      const imageChange = image instanceof File ? image : image === null && defaultValues.image ? null : undefined;
      try {
         if (imageChange !== undefined) await setThumbnail.mutateAsync({ id: saved.id, file: imageChange });
         toast.success(moduleId ? 'Module updated' : 'Module created');
      } catch (error) {
         // The module itself is saved, so don't stay here (a retry would create it twice).
         toast.error(apiErrorMessage(error, 'Module saved, but the image couldn’t be saved. Try again from Edit.'));
      }
      router.push(ROUTES.moduleDetail(saved.id));
   }, toastInvalidLanguages);

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            {isLive && <InfoAlert tone="warning">{LIVE_EDIT_NOTES.module}</InfoAlert>}
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:items-start">
               <div className="flex min-w-0 flex-col gap-6">
                  <ModuleBasicFields />
                  <ModuleContentFields />
               </div>
               <aside className="hidden min-w-0 xl:sticky xl:top-6 xl:block" aria-label="Module preview">
                  <ModuleLivePreview />
               </aside>
            </div>
            <FormActions
               sticky
               cancelHref={moduleId ? ROUTES.moduleDetail(moduleId) : ROUTES.modules}
               submitLabel="Save module"
               isSubmitting={form.formState.isSubmitting}
            />
         </form>
      </FormProvider>
   );
}
