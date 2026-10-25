'use client';

import { InfoIcon } from 'lucide-react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { BilingualFields } from '@/components/common/form/BilingualFields';
import { RichTextField } from '@/components/common/form/RichTextField';
import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { Switch } from '@/components/ui/switch';
import { QUIZ_HINTS, QUIZ_TYPE, QUIZ_TYPE_OPTIONS } from '@/constants/quiz';
import { useClearOnChange } from '@/hooks/useClearOnChange';
import { useModuleSelectOptions } from '@/hooks/useModules';
import { useModuleChapterEndTest } from '@/hooks/useQuizzes';
import { useUnitSelectOptions } from '@/hooks/useUnits';
import type { QuizFormValues } from '@/schemas/quiz.schema';

const Hint = ({ children }: { children: string }) => (
   <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <InfoIcon className="size-3.5 shrink-0" aria-hidden />
      {children}
   </p>
);

/** A new type starts from its D24 default: unit quiz unlimited, Chapter End Test 3. */
const defaultAttemptsFor = (values: QuizFormValues) => QUIZ_TYPE[values.type].defaultAttempts;

// FR-QUIZ-002, 003 (D16): module, quiz type, unit (unit quiz only), pass mark, attempts and Required/Optional,
// then English/Myanmar title and description. Type, module and unit are fixed once saved (D28).
export function QuizFields({ isEditing }: { isEditing?: boolean }) {
   const { control } = useFormContext<QuizFormValues>();
   const [moduleId, type] = useWatch({ control, name: ['moduleId', 'type'] });
   const isUnitQuiz = type === 'UNIT_QUIZ';
   const moduleOptions = useModuleSelectOptions();
   const unitOptions = useUnitSelectOptions(moduleId);
   // One Chapter End Test per module: the option is disabled once it exists.
   const { data: chapterEndTest } = useModuleChapterEndTest(isEditing ? '' : moduleId);
   const typeOptions = QUIZ_TYPE_OPTIONS.map((option) => ({
      ...option,
      disabled: option.value === 'CHAPTER_END_TEST' && Boolean(chapterEndTest),
   }));

   useClearOnChange<QuizFormValues>('moduleId', 'unitId', '');
   useClearOnChange<QuizFormValues>('type', 'maxAttempts', defaultAttemptsFor);

   return (
      <>
         <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap gap-6">
               <SelectField<QuizFormValues>
                  name="moduleId"
                  label="Module"
                  placeholder="Choose module"
                  options={moduleOptions}
                  className="min-w-60 flex-1"
                  disabled={isEditing}
               />
               <SelectField<QuizFormValues>
                  name="type"
                  label="Quiz type"
                  placeholder="Choose type"
                  options={typeOptions}
                  className="min-w-60 flex-1"
                  disabled={isEditing}
               />
               {isUnitQuiz && (
                  <SelectField<QuizFormValues>
                     name="unitId"
                     label="Unit"
                     placeholder="Choose unit"
                     options={unitOptions}
                     className="min-w-60 flex-1"
                     disabled={!moduleId || isEditing}
                  />
               )}
            </div>
            {isEditing && <Hint>{QUIZ_HINTS.lockedOnEdit}</Hint>}
            {!isEditing && chapterEndTest && <Hint>{`${QUIZ_HINTS.cetExists} (${chapterEndTest.code})`}</Hint>}
         </div>
         <div className="flex flex-wrap items-start gap-6">
            <TextField<QuizFormValues>
               name="passPercent"
               label="Pass mark (%)"
               type="number"
               placeholder="70"
               className="min-w-60 flex-1"
            />
            <div className="flex min-w-60 flex-1 flex-col gap-1.5">
               <TextField<QuizFormValues> name="maxAttempts" label="Attempts" type="number" placeholder="Unlimited" />
               <Hint>{QUIZ_HINTS.attempts}</Hint>
            </div>
         </div>
         <div className="flex flex-col gap-2">
            <Controller
               control={control}
               name="required"
               render={({ field }) => (
                  <label className="flex items-center gap-3 text-sm font-medium">
                     <Switch
                        checked={isUnitQuiz ? field.value : true}
                        onCheckedChange={field.onChange}
                        disabled={!isUnitQuiz}
                     />
                     Required (blocks unit completion until passed)
                  </label>
               )}
            />
            {!isUnitQuiz && <Hint>{QUIZ_HINTS.cetAlwaysRequired}</Hint>}
         </div>
         <BilingualFields>
            {(suffix, languageName) => (
               <>
                  <TextField<QuizFormValues>
                     name={`title${suffix}`}
                     label="Title"
                     placeholder={`Quiz title in ${languageName}`}
                  />
                  <RichTextField<QuizFormValues>
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
