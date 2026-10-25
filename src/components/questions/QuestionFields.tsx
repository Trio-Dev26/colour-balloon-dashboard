'use client';

import { InfoIcon } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { RichTextField } from '@/components/common/form/RichTextField';
import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { QUESTION_TYPE_OPTIONS } from '@/constants/question';
import { useClearOnChange } from '@/hooks/useClearOnChange';
import { useModuleSelectOptions } from '@/hooks/useModules';
import { useUnitSelectOptions } from '@/hooks/useUnits';
import type { QuestionFormValues } from '@/schemas/question.schema';
import { PromptImagesField } from './PromptImagesField';
import { QuestionAnswersFields } from './QuestionAnswersFields';

// FR-QB-002: module, unit, type and points, then the prompt with its images, the answers for the
// chosen type and an optional explanation. A question's unit never changes (D28), so on edit both
// pickers are locked; wrong unit means delete and create again.
export function QuestionFields({ isEditing }: { isEditing?: boolean }) {
   const { control } = useFormContext<QuestionFormValues>();
   const moduleId = useWatch({ control, name: 'moduleId' });
   const moduleOptions = useModuleSelectOptions();
   const unitOptions = useUnitSelectOptions(moduleId);

   useClearOnChange<QuestionFormValues>('moduleId', 'unitId', '');

   return (
      <>
         <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap gap-6">
               <SelectField<QuestionFormValues>
                  name="moduleId"
                  label="Module"
                  placeholder="Choose module"
                  options={moduleOptions}
                  className="min-w-60 flex-1"
                  disabled={isEditing}
               />
               <SelectField<QuestionFormValues>
                  name="unitId"
                  label="Unit"
                  placeholder="Choose unit"
                  options={unitOptions}
                  className="min-w-60 flex-1"
                  disabled={!moduleId || isEditing}
               />
            </div>
            {isEditing && (
               <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <InfoIcon className="size-3.5 shrink-0" aria-hidden />A question’s unit can’t change. To use it in
                  another unit, create it there.
               </p>
            )}
         </div>
         <div className="flex flex-wrap gap-6">
            <SelectField<QuestionFormValues>
               name="type"
               label="Question type"
               placeholder="Choose type"
               options={QUESTION_TYPE_OPTIONS}
               className="min-w-60 flex-1"
            />
            <TextField<QuestionFormValues>
               name="points"
               label="Points"
               type="number"
               placeholder="1"
               className="min-w-60 flex-1"
            />
         </div>
         <RichTextField<QuestionFormValues> name="prompt" label="Question" placeholder="Type the question here..." />
         <PromptImagesField />
         <QuestionAnswersFields />
         <RichTextField<QuestionFormValues>
            name="explanation"
            label="Explanation (Optional)"
            placeholder="Why the answer is correct..."
         />
      </>
   );
}
