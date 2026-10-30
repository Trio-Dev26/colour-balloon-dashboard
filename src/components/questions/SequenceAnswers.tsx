'use client';

import { InfoIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SortableList } from '@/components/common/sortable/SortableList';
import { SEQUENCE_KID_FRIENDLY_MAX_STEPS, sequenceSlotWord } from '@/constants/question';
import { emptyStep, type QuestionFormValues } from '@/schemas/question.schema';
import { AnswerItemFields } from './AnswerItemFields';
import { AnswerList } from './AnswerList';
import { ChoiceLetter } from './ChoiceLetter';
import { RemoveAnswerButton } from './RemoveAnswerButton';

// FR-QB-007: 2–20 steps entered in the correct order; learners see them shuffled. Drag a step by its handle
// (or focus it and use Space and the arrow keys) to fix the order without retyping.
export function SequenceAnswers() {
   const { control } = useFormContext<QuestionFormValues>();
   const { fields, append, remove, move } = useFieldArray({ control, name: 'steps' });

   return (
      <AnswerList
         title="Steps"
         hint="Enter the steps in the correct order, or drag them by the handle. Learners see them shuffled."
         count={fields.length}
         addLabel="Add step"
         onAdd={() => append(emptyStep())}
      >
         <div className="overflow-hidden rounded-lg border">
            <SortableList
               items={fields}
               getId={(field) => field.id}
               onMove={move}
               getHandleLabel={(_, index) => `Move step ${index + 1}`}
               itemClassName="h-auto min-h-15 gap-2 py-2 pr-2 pl-1"
               renderItem={(field, index) => {
                  const number = index + 1;
                  const word = sequenceSlotWord(index, fields.length);
                  return (
                     <div className="flex min-w-0 flex-1 items-center gap-2">
                        <ChoiceLetter letter={String(number)} />
                        <AnswerItemFields
                           name={`steps.${index}`}
                           label={`Step ${number}`}
                           placeholder={word === 'Next' ? `Step ${number}` : `Step ${number} (${word.toLowerCase()})`}
                           hideLabel
                           inputClassName="h-11"
                           imageButtonLabel={`Add image for step ${number}`}
                        />
                        <RemoveAnswerButton
                           label={`Remove step ${number}`}
                           count={fields.length}
                           onClick={() => remove(index)}
                           hideLabel
                        />
                     </div>
                  );
               }}
            />
         </div>
         {fields.length > SEQUENCE_KID_FRIENDLY_MAX_STEPS && (
            <p className="flex items-center gap-1.5 text-xs text-warning-foreground">
               <InfoIcon className="size-3.5 shrink-0" aria-hidden />
               Young learners do best with 3–{SEQUENCE_KID_FRIENDLY_MAX_STEPS} steps. Longer sequences still work.
            </p>
         )}
      </AnswerList>
   );
}
