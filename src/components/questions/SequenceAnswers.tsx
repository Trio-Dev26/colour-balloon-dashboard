'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { emptyStep, type QuestionFormValues } from '@/schemas/question.schema';
import { AnswerItemFields } from './AnswerItemFields';
import { AnswerList } from './AnswerList';
import { RemoveAnswerButton } from './RemoveAnswerButton';

// FR-QB-007: 2–20 steps entered in the correct order; learners see them shuffled.
export function SequenceAnswers() {
   const { control } = useFormContext<QuestionFormValues>();
   const { fields, append, remove } = useFieldArray({ control, name: 'steps' });

   return (
      <AnswerList
         title="Steps"
         hint="Enter the steps in the correct order. Learners see them shuffled."
         count={fields.length}
         addLabel="Add step"
         onAdd={() => append(emptyStep())}
      >
         {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-3">
               <AnswerItemFields name={`steps.${index}`} label={`Step ${index + 1}`} />
               <RemoveAnswerButton
                  label={`Remove step ${index + 1}`}
                  count={fields.length}
                  onClick={() => remove(index)}
               />
            </div>
         ))}
      </AnswerList>
   );
}
