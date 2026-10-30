'use client';

import { ArrowRightIcon, CornerDownRightIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { emptyPair, type QuestionFormValues } from '@/schemas/question.schema';
import { AnswerItemFields } from './AnswerItemFields';
import { AnswerList } from './AnswerList';
import { ChoiceLetter } from './ChoiceLetter';
import { RemoveAnswerButton } from './RemoveAnswerButton';

// Number · left item · arrow · its match · delete. From sm the headings share these columns; on phones each
// pair takes two lines (number + left item, then arrow + match + delete).
const ROW_GRID = 'grid grid-cols-[1.75rem_1fr_auto] items-center gap-2 sm:grid-cols-[1.75rem_1fr_1rem_1fr_auto]';
const HEADING = 'text-xs font-medium tracking-wide text-muted-foreground uppercase';

// FR-QB-006: 2–20 left–right pairs, each side text and/or image; learners see the right side shuffled.
export function MatchingAnswers() {
   const { control } = useFormContext<QuestionFormValues>();
   const { fields, append, remove } = useFieldArray({ control, name: 'pairs' });

   return (
      <AnswerList
         title="Pairs"
         hint="Learners see the right side shuffled and lettered A, B, C… At least 2 pairs."
         count={fields.length}
         addLabel="Add pair"
         onAdd={() => append(emptyPair())}
      >
         <div className={`${ROW_GRID} hidden sm:grid`} aria-hidden>
            <span />
            <span className={HEADING}>Left item</span>
            <span />
            <span className={HEADING}>Its match</span>
            <span />
         </div>
         {fields.map((field, index) => {
            const number = index + 1;
            return (
               <div key={field.id} className={ROW_GRID}>
                  <ChoiceLetter letter={String(number)} />
                  <div className="col-span-2 sm:col-span-1">
                     <AnswerItemFields
                        name={`pairs.${index}.left`}
                        label={`Left item ${number}`}
                        placeholder={`Left item ${number}`}
                        hideLabel
                        inputClassName="h-11"
                        imageButtonLabel={`Add image for left item ${number}`}
                     />
                  </div>
                  <span className="flex justify-center text-muted-foreground [&_svg]:size-4" aria-hidden>
                     <CornerDownRightIcon className="sm:hidden" />
                     <ArrowRightIcon className="hidden sm:block" />
                  </span>
                  <AnswerItemFields
                     name={`pairs.${index}.right`}
                     label={`Match for item ${number}`}
                     placeholder={`Match for ${number}`}
                     hideLabel
                     inputClassName="h-11"
                     imageButtonLabel={`Add image for the match of item ${number}`}
                  />
                  <RemoveAnswerButton
                     label={`Remove pair ${number}`}
                     count={fields.length}
                     onClick={() => remove(index)}
                     hideLabel
                  />
               </div>
            );
         })}
      </AnswerList>
   );
}
