'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { TRUE_FALSE_CHOICES } from '@/constants/question';
import { getFieldError } from '@/lib/form';
import { cn } from '@/lib/utils';
import type { QuestionFormValues } from '@/schemas/question.schema';
import { ChoiceLetter } from './ChoiceLetter';

// FR-QB-004: the statement is either true or false. Two cards, lettered A and B as learners see them;
// the correct one turns green like the multiple-choice correct option.
export function TrueFalseAnswer() {
   const { control, register, formState } = useFormContext<QuestionFormValues>();
   const correct = useWatch({ control, name: 'trueFalse' });
   const error = getFieldError(formState.errors, 'trueFalse');

   return (
      <fieldset className="flex flex-col gap-3">
         {/* A legend isn't a flex item, so it gets its own margin instead of the fieldset's gap. */}
         <legend className="mb-1 text-sm font-semibold">Correct answer</legend>
         <p className="text-xs text-muted-foreground">Learners see True and False as A and B.</p>
         <div className="grid gap-3 sm:grid-cols-2">
            {TRUE_FALSE_CHOICES.map((choice) => {
               const isCorrect = correct === choice.value;
               return (
                  <label
                     key={choice.value}
                     className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 text-sm transition-colors hover:bg-muted',
                        'has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                        isCorrect && 'border-success-foreground/40 bg-success hover:bg-success',
                        error && !correct && 'border-destructive'
                     )}
                  >
                     <input
                        type="radio"
                        value={choice.value}
                        className={cn('size-4 shrink-0', isCorrect ? 'accent-success-foreground' : 'accent-primary')}
                        {...register('trueFalse')}
                     />
                     <ChoiceLetter letter={choice.letter} />
                     {choice.label}
                  </label>
               );
            })}
         </div>
         {error && <p className="text-sm text-destructive">{error.message}</p>}
      </fieldset>
   );
}
