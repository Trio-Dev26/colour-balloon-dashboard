'use client';

import { InfoIcon } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { BilingualFields } from '@/components/common/form/BilingualFields';
import { RichTextField } from '@/components/common/form/RichTextField';
import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { MODULE_RULE_HINTS } from '@/constants/module';
import { useClearOnChange } from '@/hooks/useClearOnChange';
import { useModuleOptions, useModuleSelectOptions } from '@/hooks/useModules';
import { useUnitSelectOptions } from '@/hooks/useUnits';
import type { LessonFormValues } from '@/schemas/lesson.schema';
import type { ModuleOption } from '@/types/api/module.types';

const isDraft = (module: ModuleOption) => module.status === 'DRAFT';

// Module + Unit pickers, then English/Myanmar title and description (Figma "Create New Lesson").
// On edit a lesson can move to any unit of a Draft module, but only while its own module is Draft
// too (D28); in a Published or Unpublished module both pickers are locked.
interface LessonFieldsProps {
   /** Editing a saved lesson: moving it is limited to Draft modules (D28). */
   isEditing?: boolean;
   /** Locks both pickers (Create / Edit Lesson dialog on a unit's page). */
   isUnitLocked?: boolean;
}

export function LessonFields({ isEditing, isUnitLocked }: LessonFieldsProps) {
   const { control, formState } = useFormContext<LessonFormValues>();
   const moduleId = useWatch({ control, name: 'moduleId' });
   const { data: modules = [] } = useModuleOptions();
   const savedModule = modules.find((module) => module.id === formState.defaultValues?.moduleId);
   // On edit the pickers stay locked until the saved module's status is known.
   const isMoveLocked = Boolean(isEditing) && !(savedModule && isDraft(savedModule));
   const moveLockedReason =
      isEditing && savedModule && !isDraft(savedModule) ? MODULE_RULE_HINTS.lessonMoveLocked : undefined;
   // Movable: offer Draft modules only. Locked: list them all so the saved module still shows its name.
   const moduleOptions = useModuleSelectOptions(isEditing && !isMoveLocked ? isDraft : undefined);
   const unitOptions = useUnitSelectOptions(moduleId);

   // A unit belongs to one module, so picking another module clears the unit.
   useClearOnChange<LessonFormValues>('moduleId', 'unitId', '');

   return (
      <>
         <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap gap-6">
               <SelectField<LessonFormValues>
                  name="moduleId"
                  label="Module"
                  placeholder="Choose module"
                  options={moduleOptions}
                  className="min-w-60 flex-1"
                  disabled={isUnitLocked || isMoveLocked}
               />
               <SelectField<LessonFormValues>
                  name="unitId"
                  label="Unit"
                  placeholder="Choose unit"
                  options={unitOptions}
                  className="min-w-60 flex-1"
                  disabled={!moduleId || isUnitLocked || isMoveLocked}
               />
            </div>
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
                  <TextField<LessonFormValues>
                     name={`title${suffix}`}
                     label="Title"
                     placeholder={`Lesson title in ${languageName}`}
                  />
                  <RichTextField<LessonFormValues>
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
