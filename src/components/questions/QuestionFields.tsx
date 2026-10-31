'use client';

import { InfoIcon } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { CardSection } from '@/components/common/CardSection';
import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { QUESTION_LIMITS } from '@/constants/question';
import { useClearOnChange } from '@/hooks/useClearOnChange';
import { useModuleSelectOptions } from '@/hooks/useModules';
import { useUnitSelectOptions } from '@/hooks/useUnits';
import type { QuestionFormValues } from '@/schemas/question.schema';
import { QuestionContentFields } from './QuestionContentFields';
import { QuestionTypePicker } from './QuestionTypePicker';

// FR-QB-002: SETTINGS card (module, unit, type, points), then the CONTENT card (QuestionContentFields: the
// question and explanation in English and Myanmar, the shared images and answers). A question's unit never
// changes (D28), so on edit both pickers are locked; wrong unit means delete and create again.
export function QuestionFields({ isEditing }: { isEditing?: boolean }) {
   const { control } = useFormContext<QuestionFormValues>();
   const moduleId = useWatch({ control, name: 'moduleId' });
   const moduleOptions = useModuleSelectOptions();
   const unitOptions = useUnitSelectOptions(moduleId);

   useClearOnChange<QuestionFormValues>('moduleId', 'unitId', '');

   return (
      <>
         <CardSection title="Settings">
            <div className="flex flex-col gap-4">
               <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField<QuestionFormValues>
                     name="moduleId"
                     label="Module"
                     placeholder="Choose module"
                     options={moduleOptions}
                     disabled={isEditing}
                  />
                  <SelectField<QuestionFormValues>
                     name="unitId"
                     label="Unit"
                     placeholder={moduleId ? 'Choose unit' : 'Choose a module first'}
                     options={unitOptions}
                     disabled={!moduleId || isEditing}
                  />
               </div>
               {isEditing && (
                  <p className="-mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                     <InfoIcon className="size-3.5 shrink-0" aria-hidden />A question’s unit can’t change. To use it in
                     another unit, create it there.
                  </p>
               )}
               <QuestionTypePicker />
               <div className="grid gap-4 sm:grid-cols-2">
                  <TextField<QuestionFormValues>
                     name="points"
                     label="Points"
                     type="number"
                     placeholder="1"
                     min={QUESTION_LIMITS.minPoints}
                     max={QUESTION_LIMITS.maxPoints}
                  />
               </div>
            </div>
         </CardSection>
         <QuestionContentFields />
      </>
   );
}
