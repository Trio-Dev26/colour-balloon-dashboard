'use client';

import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { LanguageTabs } from '@/components/common/LanguageTabs';
import { LANGUAGE_FIELD_SUFFIX, LANGUAGE_NAME, LANGUAGES } from '@/constants/common';

interface BilingualFieldsProps {
   /**
    * Renders one language's fields. `suffix` is 'En' or 'My' (form fields are named titleEn / titleMy),
    * `languageName` is 'english' or 'myanmar' for placeholders.
    */
   children: (suffix: 'En' | 'My', languageName: string) => ReactNode;
}

// English / မြန်မာ tabs over the same fields; a tab gets a red dot when one of its fields is invalid.
export function BilingualFields({ children }: BilingualFieldsProps) {
   const { formState } = useFormContext();
   const invalidLanguages = LANGUAGES.map((language) => language.value).filter((language) =>
      Object.keys(formState.errors).some((key) => key.endsWith(LANGUAGE_FIELD_SUFFIX[language]))
   );

   return (
      <LanguageTabs invalidLanguages={invalidLanguages}>
         {(language) => (
            <div className="flex flex-col gap-6">
               {children(LANGUAGE_FIELD_SUFFIX[language], LANGUAGE_NAME[language])}
            </div>
         )}
      </LanguageTabs>
   );
}
