'use client';

import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { LanguageTabsList } from '@/components/common/LanguageTabsList';
import { Tabs } from '@/components/ui/tabs';
import { hasEnglishVersion, QUESTION_LANGUAGES } from '@/constants/question';
import { htmlToText } from '@/lib/form';
import { toQuestionPreview, type QuestionFormValues } from '@/schemas/question.schema';
import type { LanguageCode } from '@/types/ui/common.types';
import { QuestionPreview } from './QuestionPreview';

// Learner preview beside the create / edit form (FR-QB-008), redrawn as the admin types, in Myanmar or (when the
// type has one) the English translation. Like the real preview it never shows the correct answer or the explanation.
export function QuestionLivePreview() {
   const { control } = useFormContext<QuestionFormValues>();
   const values = useWatch({ control }) as QuestionFormValues;
   const [picked, setPicked] = useState<LanguageCode>(QUESTION_LANGUAGES[0].value);
   const hasEnglish = hasEnglishVersion(values.type);
   const language = hasEnglish ? picked : QUESTION_LANGUAGES[0].value;
   const fallsBack = language === 'en' && !htmlToText(values.promptEn ?? '');

   return (
      <div className="flex flex-col gap-2">
         {hasEnglish && (
            <Tabs value={language} onValueChange={(next: LanguageCode) => setPicked(next)} className="self-end">
               <LanguageTabsList languages={QUESTION_LANGUAGES} />
            </Tabs>
         )}
         <QuestionPreview question={toQuestionPreview(values, language)} />
         <p className="px-1 text-xs text-muted-foreground">
            {fallsBack && 'No English translation yet, so learners see the Myanmar question. '}
            Updates as you type. Learners don’t see the correct answer or the explanation.
         </p>
      </div>
   );
}
