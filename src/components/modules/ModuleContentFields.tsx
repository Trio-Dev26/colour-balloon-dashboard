'use client';

import { useFormContext } from 'react-hook-form';
import { LanguageTabs } from '@/components/common/LanguageTabs';
import { RichTextField } from '@/components/common/form/RichTextField';
import { TextField } from '@/components/common/form/TextField';
import { LANGUAGES } from '@/constants/common';
import type { ModuleFormValues } from '@/schemas/module.schema';
import type { LanguageCode } from '@/types/ui/common.types';

const LANGUAGE_SUFFIX: Record<LanguageCode, 'En' | 'My'> = { en: 'En', my: 'My' };
const LANGUAGE_NAME: Record<LanguageCode, string> = { en: 'english', my: 'myanmar' };

// Title, description, learning goal and outcome, once per language tab.
export function ModuleContentFields() {
   const { formState } = useFormContext<ModuleFormValues>();
   const invalidLanguages = LANGUAGES.map((l) => l.value).filter((language) =>
      Object.keys(formState.errors).some((key) => key.endsWith(LANGUAGE_SUFFIX[language]))
   );

   return (
      <LanguageTabs invalidLanguages={invalidLanguages}>
         {(language) => {
            const suffix = LANGUAGE_SUFFIX[language];
            const name = LANGUAGE_NAME[language];
            return (
               <div className="flex flex-col gap-6">
                  <TextField<ModuleFormValues>
                     name={`title${suffix}`}
                     label="Title"
                     placeholder={`Module name in ${name}`}
                  />
                  <RichTextField<ModuleFormValues>
                     name={`description${suffix}`}
                     label="Description (Optional)"
                     placeholder="Type your description here..."
                  />
                  <TextField<ModuleFormValues>
                     name={`learningGoal${suffix}`}
                     label="Learning goal"
                     placeholder={`Learning goal in ${name}`}
                     inputClassName="h-8"
                  />
                  <RichTextField<ModuleFormValues>
                     name={`learningOutcome${suffix}`}
                     label="Learning outcome"
                     placeholder="Type your learning outcome here..."
                  />
               </div>
            );
         }}
      </LanguageTabs>
   );
}
