'use client';

import { BilingualFields } from '@/components/common/form/BilingualFields';
import { RichTextField } from '@/components/common/form/RichTextField';
import { TextField } from '@/components/common/form/TextField';
import { TEXT_LIMITS } from '@/constants/common';
import type { ModuleFormValues } from '@/schemas/module.schema';

// CONTENT card: title, description, learning goal and outcome, once per language (English / မြန်မာ switch).
export function ModuleContentFields() {
   return (
      <BilingualFields cardTitle="Content">
         {(suffix, languageName) => (
            <>
               <TextField<ModuleFormValues>
                  name={`title${suffix}`}
                  label="Title"
                  placeholder={`Module name in ${languageName}`}
                  maxLength={TEXT_LIMITS.title}
               />
               <RichTextField<ModuleFormValues>
                  name={`description${suffix}`}
                  label="Description (optional)"
                  placeholder="Type your description here..."
               />
               <TextField<ModuleFormValues>
                  name={`learningGoal${suffix}`}
                  label="Learning goal"
                  placeholder={`Learning goal in ${languageName}`}
                  maxLength={TEXT_LIMITS.learningGoal}
                  inputClassName="h-8"
               />
               <RichTextField<ModuleFormValues>
                  name={`learningOutcome${suffix}`}
                  label="Learning outcome"
                  placeholder="Type your learning outcome here..."
               />
            </>
         )}
      </BilingualFields>
   );
}
