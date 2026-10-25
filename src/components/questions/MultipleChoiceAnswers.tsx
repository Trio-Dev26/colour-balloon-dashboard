'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { getFieldError } from '@/lib/form';
import { emptyOption, type QuestionFormValues } from '@/schemas/question.schema';
import { AnswerItemFields } from './AnswerItemFields';
import { AnswerList } from './AnswerList';
import { RemoveAnswerButton } from './RemoveAnswerButton';

// FR-QB-003 / D22: 2–20 options, each text and/or image, exactly one correct.
export function MultipleChoiceAnswers() {
   const { control, formState, getValues, setValue } = useFormContext<QuestionFormValues>();
   const { fields, append, remove } = useFieldArray({ control, name: 'options' });

   const markCorrect = (index: number) =>
      getValues('options').forEach((_, i) =>
         setValue(`options.${i}.correct`, i === index, { shouldValidate: formState.isSubmitted })
      );

   return (
      <AnswerList
         title="Options"
         hint="Pick the one correct option."
         count={fields.length}
         addLabel="Add option"
         onAdd={() => append(emptyOption())}
         error={getFieldError(formState.errors, 'options.root')?.message}
      >
         {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-3">
               <input
                  type="radio"
                  name="correctOption"
                  aria-label={`Option ${index + 1} is correct`}
                  className="mt-10 size-4 accent-primary"
                  defaultChecked={field.correct}
                  onChange={() => markCorrect(index)}
               />
               <AnswerItemFields name={`options.${index}`} label={`Option ${index + 1}`} />
               <RemoveAnswerButton
                  label={`Remove option ${index + 1}`}
                  count={fields.length}
                  onClick={() => remove(index)}
               />
            </div>
         ))}
      </AnswerList>
   );
}
