import { CaptionsIcon } from 'lucide-react';
import { LANGUAGES } from '@/constants/common';
import { cn } from '@/lib/utils';
import type { LanguageCode } from '@/types/ui/common.types';

// Labelled caption line under a lesson file: "Caption  EN Listen and repeat  MY …".
// The label and language tags make it clear these are the captions learners see.
export function LessonFileCaptions({ captions }: { captions: Record<LanguageCode, string> }) {
   return (
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs">
         <span className="flex shrink-0 items-center gap-1 font-medium text-tertiary-foreground">
            <CaptionsIcon className="size-3.5" aria-hidden />
            Caption
         </span>
         {LANGUAGES.map((language) => (
            <span key={language.value} className="flex min-w-0 items-center gap-1.5">
               <abbr
                  title={language.label}
                  className="shrink-0 rounded border px-1 font-medium text-tertiary-foreground uppercase no-underline"
               >
                  {language.value}
               </abbr>
               <span className={cn('truncate text-muted-foreground', language.className)}>
                  {captions[language.value]}
               </span>
            </span>
         ))}
      </div>
   );
}
