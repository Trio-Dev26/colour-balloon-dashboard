import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LANGUAGES } from '@/constants/common';
import { cn } from '@/lib/utils';
import type { LanguageCode } from '@/types/ui/common.types';

interface LanguageTabsListProps {
   invalidLanguages?: LanguageCode[];
   /** Order of the triggers; English first by default. */
   languages?: typeof LANGUAGES;
}

// English / မြန်မာ segmented triggers (inside a Tabs root); a language with invalid fields gets a red dot.
export function LanguageTabsList({ invalidLanguages = [], languages = LANGUAGES }: LanguageTabsListProps) {
   return (
      <TabsList>
         {languages.map((language) => (
            <TabsTrigger key={language.value} value={language.value} className={cn('px-3', language.className)}>
               {language.label}
               {invalidLanguages.includes(language.value) && (
                  <span className="size-1.5 rounded-full bg-destructive" aria-label="has errors" />
               )}
            </TabsTrigger>
         ))}
      </TabsList>
   );
}
