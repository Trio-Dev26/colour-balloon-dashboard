'use client';

import { useState, type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { LanguageCard } from '@/components/common/LanguageCard';
import { LanguageTabs } from '@/components/common/LanguageTabs';
import { LANGUAGE_FIELD_SUFFIX, LANGUAGE_NAME, LANGUAGES } from '@/constants/common';
import { getInvalidLanguages } from '@/lib/form';
import type { LanguageCode } from '@/types/ui/common.types';

interface BilingualFieldsProps {
   /**
    * Renders one language's fields. `suffix` is 'En' or 'My' (form fields are named titleEn / titleMy),
    * `languageName` is 'english' or 'myanmar' for placeholders.
    */
   children: (suffix: 'En' | 'My', languageName: string) => ReactNode;
   /** Shows the fields in a bordered card with this heading and a segmented switch (quiz form). */
   cardTitle?: string;
}

// English / မြန်မာ tabs over the same fields; a tab gets a red dot when one of its fields is invalid,
// and saving with errors only in the hidden tab switches to it so the field messages are visible.
export function BilingualFields({ children, cardTitle }: BilingualFieldsProps) {
   const { formState } = useFormContext();
   const [language, setLanguage] = useState<LanguageCode>(LANGUAGES[0].value);
   const [handledSubmit, setHandledSubmit] = useState(formState.submitCount);

   const invalidLanguages = getInvalidLanguages(formState.errors);

   // Runs once per submit, during render (React's "adjust state when a prop changes" pattern).
   if (formState.submitCount !== handledSubmit) {
      setHandledSubmit(formState.submitCount);
      if (invalidLanguages.length > 0 && !invalidLanguages.includes(language)) setLanguage(invalidLanguages[0]);
   }

   const tabsProps = { invalidLanguages, value: language, onValueChange: setLanguage };
   const panel = (code: LanguageCode) => (
      <div className="flex flex-col gap-6">{children(LANGUAGE_FIELD_SUFFIX[code], LANGUAGE_NAME[code])}</div>
   );

   return cardTitle ? (
      <LanguageCard title={cardTitle} {...tabsProps}>
         {panel}
      </LanguageCard>
   ) : (
      <LanguageTabs {...tabsProps}>{panel}</LanguageTabs>
   );
}
