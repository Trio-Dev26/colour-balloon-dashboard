'use client';

import { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { CardSection } from '@/components/common/CardSection';
import { RichTextField } from '@/components/common/form/RichTextField';
import { LanguageTabsList } from '@/components/common/LanguageTabsList';
import { Tabs } from '@/components/ui/tabs';
import { hasEnglishVersion, QUESTION_LANGUAGES } from '@/constants/question';
import { BlankChips } from '@/lib/blankChips';
import type { QuestionFormValues } from '@/schemas/question.schema';
import type { LanguageCode } from '@/types/ui/common.types';
import { InsertBlankButton } from './InsertBlankButton';
import { PromptImagesField } from './PromptImagesField';
import { QuestionAnswersFields } from './QuestionAnswersFields';

const FILL_BLANK_EXTENSIONS = [BlankChips];

/** The form fields that change with the language (Q24); images and answers are shared. */
const FIELDS = {
   my: { prompt: 'promptMy', explanation: 'explanationMy', name: 'Myanmar', note: '' },
   en: { prompt: 'promptEn', explanation: 'explanationEn', name: 'English', note: ' (optional)' },
} as const;

// CONTENT card of the question form, Myanmar-first (Q24): a မြန်မာ / English switch for the question and
// explanation, with the prompt images and answers in between, shared by both languages. Myanmar is required;
// English is an optional translation, and fill in the blank has none. Both editors stay mounted (hidden), so
// switching keeps the text and the editor history.
export function QuestionContentFields() {
   const { control, formState } = useFormContext<QuestionFormValues>();
   const type = useWatch({ control, name: 'type' });
   const isFillBlank = type === 'FILL_BLANK';
   const hasEnglish = hasEnglishVersion(type);
   const [picked, setPicked] = useState<LanguageCode>(QUESTION_LANGUAGES[0].value);
   const language = hasEnglish ? picked : QUESTION_LANGUAGES[0].value;
   const [handledSubmit, setHandledSubmit] = useState(formState.submitCount);

   const { errors } = formState;
   const invalidLanguages = QUESTION_LANGUAGES.map((option) => option.value).filter(
      (code) => errors[FIELDS[code].prompt] || errors[FIELDS[code].explanation]
   );
   // After a save with errors only in the hidden language, show that language (React's adjust-state-in-render).
   if (formState.submitCount !== handledSubmit) {
      setHandledSubmit(formState.submitCount);
      if (invalidLanguages.length > 0 && !invalidLanguages.includes(language)) setPicked(invalidLanguages[0]);
   }

   const languageFields = (field: 'prompt' | 'explanation') =>
      QUESTION_LANGUAGES.map(({ value: code, className }) => {
         const { name, note } = FIELDS[code];
         // Blank chips and "Insert blank" only in Myanmar: fill in the blank has no English version.
         const withBlanks = isFillBlank && code === 'my';
         return (
            <div key={code} hidden={code !== language} className={className}>
               {field === 'prompt' ? (
                  // Fill in the blank gets numbered blank chips and "Insert blank"; the key re-creates the editor
                  // when the type switches, since its extensions are read once.
                  <RichTextField<QuestionFormValues>
                     key={withBlanks ? 'blanks' : 'plain'}
                     name={FIELDS[code].prompt}
                     label={`Question${note}`}
                     placeholder={
                        withBlanks
                           ? `Type the sentence in ${name} and insert a blank where the answer goes...`
                           : `Type the question in ${name}...`
                     }
                     extensions={withBlanks ? FILL_BLANK_EXTENSIONS : undefined}
                     toolbarExtra={withBlanks ? (editor) => <InsertBlankButton editor={editor} /> : undefined}
                  />
               ) : (
                  <RichTextField<QuestionFormValues>
                     name={FIELDS[code].explanation}
                     label="Explanation (optional)"
                     placeholder={`Shown to learners after they check the answer, in ${name}`}
                  />
               )}
            </div>
         );
      });

   return (
      <Tabs value={language} onValueChange={(next: LanguageCode) => setPicked(next)}>
         <CardSection
            title="Content"
            action={
               hasEnglish && <LanguageTabsList invalidLanguages={invalidLanguages} languages={QUESTION_LANGUAGES} />
            }
         >
            <div className="flex flex-col gap-6">
               <div className="flex flex-col gap-2">
                  {languageFields('prompt')}
                  {(isFillBlank || language === 'en') && (
                     <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <InfoIcon className="mt-px size-3.5 shrink-0" aria-hidden />
                        {isFillBlank
                           ? 'Fill in the blank is Myanmar only: the blanks are Myanmar words.'
                           : 'Optional translation. Learners who pick English see the Myanmar question when this is empty. Images and answers are shared by both languages.'}
                     </p>
                  )}
               </div>
               <PromptImagesField />
               <QuestionAnswersFields />
               {languageFields('explanation')}
            </div>
         </CardSection>
      </Tabs>
   );
}
