'use client';

import { useEffect } from 'react';
import { InfoIcon } from 'lucide-react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SelectField } from '@/components/common/form/SelectField';
import { TextField } from '@/components/common/form/TextField';
import { Switch } from '@/components/ui/switch';
import { ATTEMPTS_LIMITS, PASS_PERCENT_LIMITS, QUIZ_HINTS, QUIZ_TYPE, QUIZ_TYPE_OPTIONS } from '@/constants/quiz';
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

// SETTINGS card of the quiz form (FR-QUIZ-002, 003, D16): module, quiz type and unit, then pass mark and
// attempts, then Required. Type, module and unit are fixed once saved (D28).
export function QuizSettingsFields({ isEditing }: { isEditing?: boolean }) {
   const { control, clearErrors } = useFormContext<QuizFormValues>();
   const [moduleId, type] = useWatch({ control, name: ['moduleId', 'type'] });
   const isUnitQuiz = type === 'UNIT_QUIZ';

   // The Unit field stays visible for the Chapter End Test, so drop a "Choose a unit" error from an earlier save.
   useEffect(() => {
      if (!isUnitQuiz) clearErrors('unitId');
   }, [isUnitQuiz, clearErrors]);
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

   let unitPlaceholder = 'Choose unit';
   if (!isUnitQuiz) unitPlaceholder = QUIZ_HINTS.cetNoUnit;
   else if (!moduleId) unitPlaceholder = 'Choose a module first';

   return (
      <div className="flex flex-col gap-5">
         <div className="flex flex-col gap-1.5">
            <div className="grid gap-4 sm:grid-cols-3">
               <SelectField<QuizFormValues>
                  name="moduleId"
                  label="Module"
                  placeholder="Choose module"
                  options={moduleOptions}
                  disabled={isEditing}
               />
               <SelectField<QuizFormValues>
                  name="type"
                  label="Quiz type"
                  placeholder="Choose type"
                  options={typeOptions}
                  disabled={isEditing}
               />
               {/* Always shown so the row keeps its shape; the Chapter End Test has no unit (D16). */}
               <SelectField<QuizFormValues>
                  name="unitId"
                  label="Unit"
                  placeholder={unitPlaceholder}
                  options={isUnitQuiz ? unitOptions : []}
                  disabled={!isUnitQuiz || !moduleId || isEditing}
               />
            </div>
            {isEditing && <Hint>{QUIZ_HINTS.lockedOnEdit}</Hint>}
            {!isEditing && chapterEndTest && <Hint>{`${QUIZ_HINTS.cetExists} (${chapterEndTest.code})`}</Hint>}
         </div>
         <div className="grid items-start gap-4 sm:grid-cols-2">
            <TextField<QuizFormValues>
               name="passPercent"
               label="Pass mark (%)"
               type="number"
               placeholder="70"
               min={PASS_PERCENT_LIMITS.min}
               max={PASS_PERCENT_LIMITS.max}
            />
            <div className="flex flex-col gap-1.5">
               <TextField<QuizFormValues>
                  name="maxAttempts"
                  label="Attempts"
                  type="number"
                  placeholder="Unlimited"
                  min={ATTEMPTS_LIMITS.min}
                  max={ATTEMPTS_LIMITS.max}
               />
               <Hint>{QUIZ_HINTS.attempts}</Hint>
            </div>
         </div>
         <Controller
            control={control}
            name="required"
            render={({ field }) => (
               <label className="flex items-center gap-3">
                  <Switch
                     checked={isUnitQuiz ? field.value : true}
                     onCheckedChange={field.onChange}
                     disabled={!isUnitQuiz}
                  />
                  <span className="flex flex-col">
                     <span className="text-sm font-medium">Required</span>
                     <span className="text-xs text-muted-foreground">
                        {isUnitQuiz ? QUIZ_HINTS.requiredUnitQuiz : QUIZ_HINTS.cetAlwaysRequired}
                     </span>
                  </span>
               </label>
            )}
         />
      </div>
   );
}
