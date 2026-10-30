'use client';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { ToneBadge } from '@/components/common/ToneBadge';
import { getFieldError } from '@/lib/form';
import { cn } from '@/lib/utils';
import { emptyOption, type QuestionFormValues } from '@/schemas/question.schema';
import { CHOICE_LETTERS } from '@/constants/question';
import { AnswerItemFields } from './AnswerItemFields';
import { AnswerList } from './AnswerList';
import { ChoiceLetter } from './ChoiceLetter';
import { RemoveAnswerButton } from './RemoveAnswerButton';

// FR-QB-003 / D22: 2–20 options, each text and/or image, exactly one correct. The correct option's input
// turns green with a "Correct" badge so it stands out at a glance.
export function MultipleChoiceAnswers() {
   const { control, formState, getValues, setValue } = useFormContext<QuestionFormValues>();
   const { fields, append, remove } = useFieldArray({ control, name: 'options' });
   const options = useWatch({ control, name: 'options' });

   const markCorrect = (index: number) =>
      getValues('options').forEach((_, i) =>
         setValue(`options.${i}.correct`, i === index, { shouldValidate: formState.isSubmitted })
      );

   return (
      <AnswerList
         title="Options"
         hint="Letters are added automatically. Pick the one correct option."
         count={fields.length}
         addLabel="Add option"
         onAdd={() => append(emptyOption())}
         error={getFieldError(formState.errors, 'options.root')?.message}
      >
         {fields.map((field, index) => {
            const isCorrect = Boolean(options?.[index]?.correct);
            const letter = CHOICE_LETTERS[index];
            return (
               <div key={field.id} className="flex items-center gap-3">
                  <input
                     type="radio"
                     name="correctOption"
                     aria-label={`Option ${letter} is correct`}
                     className={cn('size-4 shrink-0', isCorrect ? 'accent-success-foreground' : 'accent-primary')}
                     defaultChecked={field.correct}
                     onChange={() => markCorrect(index)}
                  />
                  <ChoiceLetter letter={letter} />
                  <AnswerItemFields
                     name={`options.${index}`}
                     label={`Option ${letter}`}
                     placeholder={`Option ${letter} text`}
                     hideLabel
                     inputClassName={cn('h-11', isCorrect && 'border-success-foreground/40 bg-success')}
                     endAdornment={
                        isCorrect && (
                           <ToneBadge tone="success" className="bg-success-border">
                              Correct
                           </ToneBadge>
                        )
                     }
                  />
                  <RemoveAnswerButton
                     label={`Remove option ${letter}`}
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
