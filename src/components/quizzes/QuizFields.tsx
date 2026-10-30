'use client';

import { CardSection } from '@/components/common/CardSection';
import { BilingualFields } from '@/components/common/form/BilingualFields';
import { RichTextField } from '@/components/common/form/RichTextField';
import { TextField } from '@/components/common/form/TextField';
import type { QuizFormValues } from '@/schemas/quiz.schema';
import { QuizSettingsFields } from './QuizSettingsFields';

// Quiz form body: SETTINGS card, then the CONTENT card with English / Myanmar title and description.
export function QuizFields({ isEditing }: { isEditing?: boolean }) {
   return (
      <>
         <CardSection title="Settings">
            <QuizSettingsFields isEditing={isEditing} />
         </CardSection>
         <BilingualFields cardTitle="Content">
            {(suffix, languageName) => (
               <>
                  <TextField<QuizFormValues>
                     name={`title${suffix}`}
                     label="Title"
                     placeholder={`Quiz title in ${languageName}`}
                  />
                  <RichTextField<QuizFormValues>
                     name={`description${suffix}`}
                     label="Description (optional)"
                     placeholder="Type your description here..."
                  />
               </>
            )}
         </BilingualFields>
      </>
   );
}
