'use client';

import { BilingualFields } from '@/components/common/form/BilingualFields';
import { RichTextField } from '@/components/common/form/RichTextField';
import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { useModuleSelectOptions } from '@/hooks/useModules';
import type { UnitFormValues } from '@/schemas/unit.schema';

interface UnitFieldsProps {
   moduleFieldClassName?: string;
   /** Locks the module picker (Create Unit dialog opened from a module's page). */
   isModuleLocked?: boolean;
}

// Module picker + English/Myanmar title and description. Used by the unit pages and the Create Unit dialog.
export function UnitFields({ moduleFieldClassName, isModuleLocked }: UnitFieldsProps) {
   const moduleOptions = useModuleSelectOptions();

   return (
      <>
         <SelectField<UnitFormValues>
            name="moduleId"
            label="Module"
            placeholder="Choose module"
            options={moduleOptions}
            className={moduleFieldClassName}
            disabled={isModuleLocked}
         />
         <BilingualFields>
            {(suffix, languageName) => (
               <>
                  <TextField<UnitFormValues>
                     name={`title${suffix}`}
                     label="Title"
                     placeholder={`Unit title in ${languageName}`}
                  />
                  <RichTextField<UnitFormValues>
                     name={`description${suffix}`}
                     label="Description (Optional)"
                     placeholder="Type your description here..."
                  />
               </>
            )}
         </BilingualFields>
      </>
   );
}
