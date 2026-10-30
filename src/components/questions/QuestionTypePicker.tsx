'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { IconTile } from '@/components/common/IconTile';
import { QUESTION_TYPE_CARDS } from '@/config/questionTypes';
import { cn } from '@/lib/utils';
import type { QuestionFormValues } from '@/schemas/question.schema';

// Question type as five cards (icon, title, what the learner does) instead of a dropdown. Native radios
// underneath, so arrow keys move between cards. The form keeps every type's answers, so switching type and
// back loses nothing. Columns follow the card's own width (container query), not the screen: the live
// preview beside the form makes it narrower on desktop.
export function QuestionTypePicker() {
   const { control } = useFormContext<QuestionFormValues>();

   return (
      <Controller
         control={control}
         name="type"
         render={({ field }) => (
            <fieldset className="@container flex flex-col gap-2">
               <legend className="mb-2 text-sm font-medium">Question type</legend>
               <div className="grid grid-cols-2 gap-2 @lg:grid-cols-3 @2xl:grid-cols-5">
                  {QUESTION_TYPE_CARDS.map(({ type, label, icon, description }) => {
                     const selected = field.value === type;
                     return (
                        <label
                           key={type}
                           className={cn(
                              'flex cursor-pointer flex-col gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-accent-border',
                              'has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                              selected && 'border-primary bg-accent hover:border-primary'
                           )}
                        >
                           <input
                              type="radio"
                              name={field.name}
                              value={type}
                              checked={selected}
                              onChange={() => field.onChange(type)}
                              onBlur={field.onBlur}
                              className="sr-only"
                           />
                           <IconTile icon={icon} size="sm" tone={selected ? 'primary' : 'neutral'} />
                           <span className="flex flex-col gap-1">
                              <span className="text-sm font-medium">{label}</span>
                              <span className="text-xs text-muted-foreground">{description}</span>
                           </span>
                        </label>
                     );
                  })}
               </div>
            </fieldset>
         )}
      />
   );
}
