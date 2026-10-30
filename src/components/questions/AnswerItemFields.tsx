'use client';

import type { ReactNode } from 'react';
import { Controller, useFormContext, type Path } from 'react-hook-form';
import { TextField } from '@/components/common/form/TextField';
import { cn } from '@/lib/utils';
import type { QuestionFormValues } from '@/schemas/question.schema';
import { QuestionImageThumb } from './QuestionImageThumb';
import { QuestionImageUploadButton } from './QuestionImageUploadButton';

interface AnswerItemFieldsProps {
   /** Path of the item, e.g. "options.0" or "pairs.1.left"; its `text` and `image` are edited here. */
   name: string;
   label: ReactNode;
   placeholder?: string;
   /** Label for screen readers only; the row lines up with the input instead of the label. */
   hideLabel?: boolean;
   inputClassName?: string;
   /** Shown inside the text input on the right, e.g. a "Correct" badge. */
   endAdornment?: ReactNode;
   /** Square image button whose name says which item it's for (e.g. "Add image for left item 1"). */
   imageButtonLabel?: string;
}

// Text and/or one image for an option, matching side or step (FR-QB-003, 006, 007).
export function AnswerItemFields({
   name,
   label,
   placeholder = 'Text',
   hideLabel,
   inputClassName,
   endAdornment,
   imageButtonLabel,
}: AnswerItemFieldsProps) {
   const { control } = useFormContext<QuestionFormValues>();

   return (
      <div className={hideLabel ? 'flex min-w-0 flex-1 items-center gap-3' : 'flex min-w-0 flex-1 items-start gap-3'}>
         <TextField<QuestionFormValues>
            name={`${name}.text` as Path<QuestionFormValues>}
            label={label}
            placeholder={placeholder}
            hideLabel={hideLabel}
            inputClassName={inputClassName}
            endAdornment={endAdornment}
            className="flex-1"
         />
         <Controller
            control={control}
            name={`${name}.image` as Path<QuestionFormValues>}
            render={({ field }) => {
               const image = field.value as QuestionFormValues['steps'][number]['image'];
               const compact = Boolean(imageButtonLabel);
               return (
                  // pt-7 lines the button up with the input under the field label. Compact rows give the button
                  // and the thumbnail the same fixed slot, so adding an image never changes the input's width.
                  <div className={cn(!hideLabel && 'pt-7', compact && 'flex w-11 shrink-0 justify-center')}>
                     {image ? (
                        <QuestionImageThumb
                           url={image.url}
                           size={compact ? 'sm' : 'md'}
                           onRemove={() => field.onChange(null)}
                        />
                     ) : (
                        <QuestionImageUploadButton
                           label={imageButtonLabel ?? 'Image'}
                           iconOnly={Boolean(imageButtonLabel)}
                           onUploaded={field.onChange}
                        />
                     )}
                  </div>
               );
            }}
         />
      </div>
   );
}
