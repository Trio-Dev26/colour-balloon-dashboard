'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormActions } from '@/components/common/form/FormActions';
import { ROUTES } from '@/constants/routes';
import { useCreateLesson, useUpdateLesson } from '@/hooks/useLessons';
import { apiErrorMessage, toastInvalidLanguages } from '@/lib/form';
import { EMPTY_LESSON_FORM, lessonFormSchema, toLessonPayload, type LessonFormValues } from '@/schemas/lesson.schema';
import { LessonFields } from './LessonFields';

interface LessonFormProps {
   title: string;
   /** Edit mode when set. */
   lessonId?: string;
   defaultValues?: LessonFormValues;
}

// Full-page Create / Edit lesson form (Figma "Create New Lesson").
export function LessonForm({ title, lessonId, defaultValues = EMPTY_LESSON_FORM }: LessonFormProps) {
   const router = useRouter();
   const form = useForm<LessonFormValues>({ resolver: zodResolver(lessonFormSchema), defaultValues });
   const createLesson = useCreateLesson();
   const updateLesson = useUpdateLesson(lessonId ?? '');
   const backHref = lessonId ? ROUTES.lessonDetail(lessonId) : ROUTES.lessons;

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         const payload = toLessonPayload(values);
         if (lessonId) {
            await updateLesson.mutateAsync(payload);
            toast.success('Lesson updated');
            router.push(backHref);
         } else {
            const created = await createLesson.mutateAsync(payload);
            toast.success('Lesson created');
            // Straight to the new lesson, where its files go.
            router.push(ROUTES.lessonDetail(created.id));
         }
      } catch (error) {
         // Keep the form open with the user's input so they can retry.
         toast.error(apiErrorMessage(error, 'Couldn’t save the lesson. Please try again.'));
      }
   }, toastInvalidLanguages);

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            <LessonFields isEditing={Boolean(lessonId)} />
            <FormActions
               cancelHref={backHref}
               submitLabel="Save lesson"
               isSubmitting={createLesson.isPending || updateLesson.isPending}
            />
         </form>
      </FormProvider>
   );
}
