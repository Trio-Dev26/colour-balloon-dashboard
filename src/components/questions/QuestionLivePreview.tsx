'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { toQuestionPreview, type QuestionFormValues } from '@/schemas/question.schema';
import { QuestionPreview } from './QuestionPreview';

// Learner preview beside the create / edit form (FR-QB-008), redrawn as the admin types.
// Like the real preview it never shows the correct answer or the explanation.
export function QuestionLivePreview() {
   const { control } = useFormContext<QuestionFormValues>();
   const values = useWatch({ control }) as QuestionFormValues;

   return (
      <div className="flex flex-col gap-2">
         <QuestionPreview question={toQuestionPreview(values)} />
         <p className="px-1 text-xs text-muted-foreground">
            Updates as you type. Learners don’t see the correct answer or the explanation.
         </p>
      </div>
   );
}
