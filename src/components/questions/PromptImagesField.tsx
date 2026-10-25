'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { QUESTION_LIMITS } from '@/constants/question';
import type { QuestionFormValues } from '@/schemas/question.schema';
import { QuestionImageThumb } from './QuestionImageThumb';
import { QuestionImageUploadButton } from './QuestionImageUploadButton';

// Up to QUESTION_LIMITS.maxPromptImages images shown with the prompt (FR-QB-002).
export function PromptImagesField() {
   const { control } = useFormContext<QuestionFormValues>();

   return (
      <Controller
         control={control}
         name="promptImages"
         render={({ field }) => (
            <div className="flex flex-wrap items-center gap-3">
               {field.value.map((image) => (
                  <QuestionImageThumb
                     key={image.id}
                     url={image.url}
                     onRemove={() => field.onChange(field.value.filter((other) => other.id !== image.id))}
                  />
               ))}
               {field.value.length < QUESTION_LIMITS.maxPromptImages && (
                  <QuestionImageUploadButton
                     label="Add prompt image"
                     onUploaded={(media) => field.onChange([...field.value, media])}
                  />
               )}
            </div>
         )}
      />
   );
}
