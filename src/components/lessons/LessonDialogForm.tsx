'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DialogForm } from '@/components/common/form/DialogForm';
import { useCreateLesson, useUpdateLesson } from '@/hooks/useLessons';
import { apiErrorMessage, toastInvalidLanguages } from '@/lib/form';
import { lessonFormSchema, toLessonPayload, type LessonFormValues } from '@/schemas/lesson.schema';
import { LessonFields } from './LessonFields';

interface LessonDialogFormProps {
   /** Edit mode when set. */
   lessonId?: string;
   defaultValues: LessonFormValues;
   onClose: () => void;
}

// Create / Edit Lesson form inside a dialog on the unit detail page (Figma "Create Lesson"). Module and unit
// are locked to the page's unit; moving a lesson to another unit is done on the full Edit Lesson page (D28).
export function LessonDialogForm({ lessonId, defaultValues, onClose }: LessonDialogFormProps) {
   const form = useForm<LessonFormValues>({ resolver: zodResolver(lessonFormSchema), defaultValues });
   const createLesson = useCreateLesson();
   const updateLesson = useUpdateLesson(lessonId ?? '');

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         const payload = toLessonPayload(values);
         if (lessonId) await updateLesson.mutateAsync(payload);
         else await createLesson.mutateAsync(payload);
         toast.success(lessonId ? 'Lesson updated' : 'Lesson created');
         onClose();
      } catch (error) {
         // Keep the dialog open with the user's input so they can retry.
         toast.error(apiErrorMessage(error, 'Couldn’t save the lesson. Please try again.'));
      }
   }, toastInvalidLanguages);

   return (
      <FormProvider {...form}>
         <DialogForm
            title={lessonId ? 'Edit Lesson' : 'Create Lesson'}
            submitLabel="Save lesson"
            isSubmitting={createLesson.isPending || updateLesson.isPending}
            onSubmit={onSubmit}
            onCancel={onClose}
         >
            <LessonFields isUnitLocked />
         </DialogForm>
      </FormProvider>
   );
}
