'use client';

import { BilingualFields } from '@/components/common/form/BilingualFields';
import { RichTextField } from '@/components/common/form/RichTextField';
import { TextField } from '@/components/common/form/TextField';
import type { ModuleFormValues } from '@/schemas/module.schema';

// Title, description, learning goal and outcome, once per language tab.
export function ModuleContentFields() {
   return (
      <BilingualFields>
         {(suffix, languageName) => (
            <>
               <TextField<ModuleFormValues>
                  name={`title${suffix}`}
                  label="Title"
                  placeholder={`Module name in ${languageName}`}
               />
               <RichTextField<ModuleFormValues>
                  name={`description${suffix}`}
                  label="Description (Optional)"
                  placeholder="Type your description here..."
               />
               <TextField<ModuleFormValues>
                  name={`learningGoal${suffix}`}
                  label="Learning goal"
                  placeholder={`Learning goal in ${languageName}`}
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
