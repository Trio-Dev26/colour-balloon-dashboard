import type { ReactNode } from 'react';

import { RichTextView } from '@/components/common/rich-text/RichTextView';
import { EMPTY_VALUE } from '@/constants/common';
import type { LanguageCode } from '@/types/ui/common.types';
import type { ModuleDetail } from '@/types/api/module.types';

function IntroBlock({ title, children }: { title: string; children: ReactNode }) {
   return (
      <div className="flex flex-col gap-2 text-sm">
         <h3 className="font-medium">{title}</h3>
         {children}
      </div>
   );
}

// Learning goal and outcome in one language (read-only); the language tabs live in EntitySummary.
export function ModuleIntroduction({ module, language }: { module: ModuleDetail; language: LanguageCode }) {
   const goal = language === 'en' ? module.learningGoalEn : module.learningGoalMy;
   const outcome = language === 'en' ? module.learningOutcomeEn : module.learningOutcomeMy;

   return (
      <div className="flex flex-col gap-3 pt-3">
         <IntroBlock title="Learning goal">
            <p className="text-muted-foreground">{goal || EMPTY_VALUE}</p>
         </IntroBlock>
         <IntroBlock title="Learning outcome">
            {outcome ? (
               <RichTextView html={outcome} className="text-muted-foreground" />
            ) : (
               <p className="text-muted-foreground">{EMPTY_VALUE}</p>
            )}
         </IntroBlock>
      </div>
   );
}
