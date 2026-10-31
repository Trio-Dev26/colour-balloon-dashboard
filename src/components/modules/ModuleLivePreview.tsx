'use client';

import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { LanguageTabsList } from '@/components/common/LanguageTabsList';
import { RichTextView } from '@/components/common/rich-text/RichTextView';
import { ToneBadge } from '@/components/common/ToneBadge';
import { Tabs } from '@/components/ui/tabs';
import { LANGUAGE_FIELD_SUFFIX, LANGUAGES } from '@/constants/common';
import { useCategoryOptions, useLevelOptions } from '@/hooks/useCatalog';
import { useObjectUrl } from '@/hooks/useObjectUrl';
import { htmlToText } from '@/lib/form';
import { cn } from '@/lib/utils';
import type { ModuleFormValues } from '@/schemas/module.schema';
import type { LanguageCode } from '@/types/ui/common.types';

// Card beside the module form showing the module as it reads in either language, redrawn as the admin types.
export function ModuleLivePreview() {
   const { control } = useFormContext<ModuleFormValues>();
   const values = useWatch({ control }) as ModuleFormValues;
   const [language, setLanguage] = useState<LanguageCode>(LANGUAGES[0].value);
   const levelOptions = useLevelOptions();
   const categoryOptions = useCategoryOptions();
   const coverUrl = useObjectUrl(values.image);

   const suffix = LANGUAGE_FIELD_SUFFIX[language];
   const title = values[`title${suffix}`];
   const description = values[`description${suffix}`];
   const goal = values[`learningGoal${suffix}`];
   const level = levelOptions.find((option) => option.value === values.levelId)?.label;
   const category = categoryOptions.find((option) => option.value === values.categoryId)?.label;
   const fontClass = LANGUAGES.find((option) => option.value === language)?.className;

   return (
      <div className="flex flex-col gap-2">
         <Tabs value={language} onValueChange={(next: LanguageCode) => setLanguage(next)} className="self-end">
            <LanguageTabsList />
         </Tabs>
         <article className="overflow-hidden rounded-xl border bg-card">
            <div className="flex aspect-video items-center justify-center bg-muted">
               {coverUrl ? (
                  // Plain <img>: object URLs and short-lived signed URLs can't go through next/image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverUrl} alt="" className="size-full object-cover" />
               ) : (
                  <ImageIcon className="size-8 text-tertiary-foreground" aria-label="No cover image" />
               )}
            </div>
            <div className={cn('flex flex-col gap-3 p-4', fontClass)}>
               {(level || category) && (
                  <div className="flex flex-wrap gap-1.5 font-sans">
                     {level && <ToneBadge tone="success">{level}</ToneBadge>}
                     {category && <ToneBadge tone="info">{category}</ToneBadge>}
                  </div>
               )}
               <h3 className={cn('text-lg leading-6 font-bold', !title && 'text-muted-foreground italic')}>
                  {title || 'Module title'}
               </h3>
               {htmlToText(description) && (
                  <RichTextView html={description} className="line-clamp-4 text-sm text-muted-foreground" />
               )}
               {goal && (
                  <p className="rounded-lg bg-muted/60 p-3 text-sm">
                     <span className="block font-sans text-xs font-medium text-muted-foreground">Learning goal</span>
                     {goal}
                  </p>
               )}
            </div>
         </article>
         <p className="px-1 text-xs text-muted-foreground">Updates as you type.</p>
      </div>
   );
}
