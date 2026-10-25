'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { emptyPair, type QuestionFormValues } from '@/schemas/question.schema';
import { AnswerItemFields } from './AnswerItemFields';
import { AnswerList } from './AnswerList';
import { RemoveAnswerButton } from './RemoveAnswerButton';

// FR-QB-006: 2–20 left–right pairs, each side text and/or image; learners see the right side shuffled.
export function MatchingAnswers() {
   const { control } = useFormContext<QuestionFormValues>();
   const { fields, append, remove } = useFieldArray({ control, name: 'pairs' });

   return (
      <AnswerList
         title="Pairs"
         hint="Enter each matching pair. Learners see the right side shuffled."
         count={fields.length}
         addLabel="Add pair"
         onAdd={() => append(emptyPair())}
      >
         {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-3">
               <AnswerItemFields name={`pairs.${index}.left`} label={`Left ${index + 1}`} />
               <AnswerItemFields name={`pairs.${index}.right`} label={`Right ${index + 1}`} />
               <RemoveAnswerButton
                  label={`Remove pair ${index + 1}`}
                  count={fields.length}
                  onClick={() => remove(index)}
               />
            </div>
         ))}
      </AnswerList>
   );
}
