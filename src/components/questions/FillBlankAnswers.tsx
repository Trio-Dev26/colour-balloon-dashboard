'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { TextField } from '@/components/common/form/TextField';
import { countBlanks, type QuestionFormValues } from '@/schemas/question.schema';

// FR-QB-005 / D23: one answer box per ___ in the prompt; each blank accepts several answers.
export function FillBlankAnswers() {
   const { control, getValues, setValue } = useFormContext<QuestionFormValues>();
   const prompt = useWatch({ control, name: 'prompt' });
   const count = countBlanks(prompt);

   // Grow the list as blanks are typed; extra entries are kept (and ignored) so deleting a ___ by mistake loses nothing.
   useEffect(() => {
      const blanks = getValues('blanks');
      if (blanks.length < count) {
         setValue('blanks', [...blanks, ...Array.from({ length: count - blanks.length }, () => ({ accepted: '' }))]);
      }
   }, [count, getValues, setValue]);

   return (
      <section className="flex flex-col gap-3">
         <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Accepted answers</h3>
            <p className="text-xs text-muted-foreground">
               Type ___ (three underscores) in the question for each blank. Separate several accepted answers with
               commas.
            </p>
         </div>
         {count === 0 ? (
            <p className="text-sm text-muted-foreground">No blanks in the question yet.</p>
         ) : (
            Array.from({ length: count }, (_, index) => (
               <TextField<QuestionFormValues>
                  key={index}
                  name={`blanks.${index}.accepted`}
                  label={`Blank ${index + 1}`}
                  placeholder="e.g. ကာ, ka"
               />
            ))
         )}
      </section>
   );
}
