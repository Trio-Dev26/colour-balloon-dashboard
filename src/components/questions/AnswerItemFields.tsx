'use client';

import { Controller, useFormContext, type Path } from 'react-hook-form';
import { TextField } from '@/components/common/form/TextField';
import type { QuestionFormValues } from '@/schemas/question.schema';
import { QuestionImageThumb } from './QuestionImageThumb';
import { QuestionImageUploadButton } from './QuestionImageUploadButton';

interface AnswerItemFieldsProps {
   /** Path of the item, e.g. "options.0" or "pairs.1.left"; its `text` and `image` are edited here. */
   name: string;
   label: string;
}

// Text and/or one image for an option, matching side or step (FR-QB-003, 006, 007).
export function AnswerItemFields({ name, label }: AnswerItemFieldsProps) {
   const { control } = useFormContext<QuestionFormValues>();

   return (
      <div className="flex min-w-0 flex-1 items-start gap-3">
         <TextField<QuestionFormValues>
            name={`${name}.text` as Path<QuestionFormValues>}
            label={label}
            placeholder="Text"
            className="flex-1"
         />
         <Controller
            control={control}
            name={`${name}.image` as Path<QuestionFormValues>}
            render={({ field }) => {
               const image = field.value as QuestionFormValues['steps'][number]['image'];
               return (
                  // pt-7 lines the button up with the input under the field label.
                  <div className="pt-7">
                     {image ? (
                        <QuestionImageThumb url={image.url} onRemove={() => field.onChange(null)} />
                     ) : (
                        <QuestionImageUploadButton label="Image" onUploaded={field.onChange} />
                     )}
                  </div>
               );
            }}
         />
      </div>
   );
}
