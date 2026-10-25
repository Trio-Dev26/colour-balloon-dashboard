'use client';

import { useFormContext } from 'react-hook-form';
import { getFieldError } from '@/lib/form';
import type { QuestionFormValues } from '@/schemas/question.schema';

const CHOICES = [
   { value: 'true', label: 'True' },
   { value: 'false', label: 'False' },
] as const;

// FR-QB-004: the statement is either true or false.
export function TrueFalseAnswer() {
   const { register, formState } = useFormContext<QuestionFormValues>();
   const error = getFieldError(formState.errors, 'trueFalse');

   return (
      <fieldset className="flex flex-col gap-3">
         <legend className="mb-3 text-sm font-semibold">Correct answer</legend>
         <div className="flex gap-6">
            {CHOICES.map((choice) => (
               <label key={choice.value} className="flex items-center gap-2 text-sm">
                  <input
                     type="radio"
                     value={choice.value}
                     className="size-4 accent-primary"
                     {...register('trueFalse')}
                  />
                  {choice.label}
               </label>
            ))}
         </div>
         {error && <p className="text-sm text-destructive">{error.message}</p>}
      </fieldset>
   );
}
