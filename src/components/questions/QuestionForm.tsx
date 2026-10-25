'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormActions } from '@/components/common/form/FormActions';
import { ROUTES } from '@/constants/routes';
import { useCreateQuestion, useUpdateQuestion } from '@/hooks/useQuestions';
import { apiErrorMessage } from '@/lib/form';
import {
   EMPTY_QUESTION_FORM,
   questionFormSchema,
   toQuestionPayload,
   type QuestionFormValues,
} from '@/schemas/question.schema';
import { QuestionFields } from './QuestionFields';

interface QuestionFormProps {
   title: string;
   /** Edit mode when set. */
   questionId?: string;
   defaultValues?: QuestionFormValues;
}

// Full-page Create / Edit question form (FR-QB-002..007).
export function QuestionForm({ title, questionId, defaultValues = EMPTY_QUESTION_FORM }: QuestionFormProps) {
   const router = useRouter();
   const form = useForm<QuestionFormValues>({ resolver: zodResolver(questionFormSchema), defaultValues });
   const createQuestion = useCreateQuestion();
   const updateQuestion = useUpdateQuestion(questionId ?? '');

   const onSubmit = form.handleSubmit(async (values) => {
      try {
         const payload = toQuestionPayload(values);
         if (questionId) await updateQuestion.mutateAsync(payload);
         else await createQuestion.mutateAsync(payload);
         toast.success(questionId ? 'Question updated' : 'Question created');
         router.push(ROUTES.questions);
      } catch (error) {
         // Keep the form open with the user's input so they can retry.
         toast.error(apiErrorMessage(error, 'Couldn’t save the question. Please try again.'));
      }
   });

   return (
      <FormProvider {...form}>
         <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
            <h2 className="text-2xl leading-7.5 font-bold tracking-[-0.5px]">{title}</h2>
            <QuestionFields isEditing={Boolean(questionId)} />
            <FormActions
               cancelHref={ROUTES.questions}
               submitLabel="Save question"
               isSubmitting={createQuestion.isPending || updateQuestion.isPending}
            />
         </form>
      </FormProvider>
   );
}
