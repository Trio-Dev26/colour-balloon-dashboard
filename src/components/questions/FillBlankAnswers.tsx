'use client';

import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { TagInput } from '@/components/common/form/TagInput';
import { ACCEPTED_ANSWER_SEPARATOR } from '@/constants/question';
import { getFieldError } from '@/lib/form';
import { countBlanks, splitAccepted, type QuestionFormValues } from '@/schemas/question.schema';
import { ChoiceLetter } from './ChoiceLetter';

/** Chips ⇄ the comma-separated form value, which the schema and API body already use. */
const joinAccepted = (answers: string[]) => answers.join(`${ACCEPTED_ANSWER_SEPARATOR} `);

// FR-QB-005 / D23: one row per blank in the question, numbered like the blank chips in the editor;
// each blank accepts several answers, added as chips.
export function FillBlankAnswers() {
   const { control, formState, getValues, setValue } = useFormContext<QuestionFormValues>();
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
               One row per blank. Type an answer and press Enter. A blank can accept several answers.
            </p>
         </div>
         {count === 0 ? (
            <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
               No blanks yet. Click <span className="font-medium text-accent-foreground">Insert blank</span> in the
               question toolbar where the answer goes.
            </p>
         ) : (
            Array.from({ length: count }, (_, index) => {
               const name = `blanks.${index}.accepted` as const;
               const error = getFieldError(formState.errors, name);
               return (
                  <div key={index} className="flex flex-col gap-1.5">
                     <div className="flex items-center gap-3">
                        <ChoiceLetter letter={String(index + 1)} />
                        <Controller
                           control={control}
                           name={name}
                           render={({ field }) => (
                              <TagInput
                                 id={name}
                                 label={`Blank ${index + 1} accepted answers`}
                                 tags={splitAccepted(field.value ?? '')}
                                 onChange={(tags) => field.onChange(joinAccepted(tags))}
                                 separator={ACCEPTED_ANSWER_SEPARATOR}
                                 placeholder="Type and press Enter"
                                 invalid={!!error}
                              />
                           )}
                        />
                     </div>
                     {error && <p className="pl-10 text-sm text-destructive">{error.message}</p>}
                  </div>
               );
            })
         )}
      </section>
   );
}
