'use client';

import { BilingualFields } from '@/components/common/form/BilingualFields';
import { RichTextField } from '@/components/common/form/RichTextField';
import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { InfoIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { MODULE_RULE_HINTS } from '@/constants/module';
import { useModuleOptions, useModuleSelectOptions } from '@/hooks/useModules';
import type { UnitFormValues } from '@/schemas/unit.schema';
import type { ModuleOption } from '@/types/api/module.types';

interface UnitFieldsProps {
   moduleFieldClassName?: string;
   /** Locks the module picker (Create Unit dialog opened from a module's page). */
   isModuleLocked?: boolean;
   /** Editing a saved unit: picking another module moves it, so only Draft modules are offered (D28). */
   isEditing?: boolean;
}

const isDraft = (module: ModuleOption) => module.status === 'DRAFT';

// Module picker + English/Myanmar title and description. Used by the unit pages and the Create Unit dialog.
export function UnitFields({ moduleFieldClassName, isModuleLocked, isEditing }: UnitFieldsProps) {
   const { data: modules = [] } = useModuleOptions();
   const savedModuleId = useFormContext<UnitFormValues>().formState.defaultValues?.moduleId;
   const savedModule = modules.find((module) => module.id === savedModuleId);
   // A unit in a published module can't move at all; a Draft one can move to another Draft module.
   const moveLockedReason =
      isEditing && savedModule && !isDraft(savedModule) ? MODULE_RULE_HINTS.unitMoveLocked : undefined;
   const moduleOptions = useModuleSelectOptions(isEditing && !moveLockedReason ? isDraft : undefined);

   return (
      <>
         <div className="flex flex-col gap-1.5">
            <SelectField<UnitFormValues>
               name="moduleId"
               label="Module"
               placeholder="Choose module"
               options={moduleOptions}
               className={moduleFieldClassName}
               disabled={isModuleLocked || Boolean(moveLockedReason)}
            />
            {moveLockedReason && (
               <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <InfoIcon className="size-3.5 shrink-0" aria-hidden />
                  {moveLockedReason}
               </p>
            )}
         </div>
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
