'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormActions } from '@/components/common/form/FormActions';
import { ROUTES } from '@/constants/routes';
import { useCreateQuiz, useUpdateQuiz } from '@/hooks/useQuizzes';
import { apiErrorMessage, toastInvalidLanguages } from '@/lib/form';
import { EMPTY_QUIZ_FORM, quizFormSchema, toQuizPayload, type QuizFormValues } from '@/schemas/quiz.schema';
import { QuizFields } from './QuizFields';

interface QuizFormProps {
   title: string;
   /** Edit mode when set. */
   quizId?: string;
   defaultValues?: QuizFormValues;
}

// Full-page Create / Edit quiz form (FR-QUIZ-002, 003).
export function QuizForm({ title, quizId, defaultValues = EMPTY_QUIZ_FORM }: QuizFormProps) {
   const router = useRouter();
   const form = useForm<QuizFormValues>({ resolver: zodResolver(quizFormSchema), defaultValues });
   const createQuiz = useCreateQuiz();
   const updateQuiz = useUpdateQuiz(quizId ?? '');
   const backHref = quizId ? ROUTES.quizDetail(quizId) : ROUTES.quizzes;

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         const payload = toQuizPayload(values);
         if (quizId) {
            await updateQuiz.mutateAsync(payload);
            toast.success('Quiz updated');
            router.push(backHref);
         } else {
            const created = await createQuiz.mutateAsync(payload);
            toast.success('Quiz created');
            // Straight to the new quiz, where its questions are added.
            router.push(ROUTES.quizDetail(created.id));
         }
      } catch (error) {
         // Keep the form open with the user's input so they can retry.
         toast.error(apiErrorMessage(error, 'Couldn’t save the quiz. Please try again.'));
      }
   }, toastInvalidLanguages);

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            <QuizFields isEditing={Boolean(quizId)} />
            <FormActions
               cancelHref={backHref}
               submitLabel="Save quiz"
               isSubmitting={createQuiz.isPending || updateQuiz.isPending}
            />
         </form>
      </FormProvider>
   );
}
