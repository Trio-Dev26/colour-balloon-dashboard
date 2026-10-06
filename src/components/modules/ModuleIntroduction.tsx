'use client';

import type { ReactNode } from 'react';

import { LanguageTabs } from '@/components/common/LanguageTabs';
import { RichTextView } from '@/components/common/rich-text/RichTextView';
import { EMPTY_VALUE } from '@/constants/common';
import { cn } from '@/lib/utils';
import type { LanguageCode } from '@/types/ui/common.types';
import type { ModuleDetail } from '@/types/api/module.types';

function getContent(module: ModuleDetail | undefined, language: LanguageCode) {
   return language === 'en'
      ? { goal: module?.learningGoalEn, outcome: module?.learningOutcomeEn }
      : { goal: module?.learningGoalMy, outcome: module?.learningOutcomeMy };
}

function IntroBlock({ title, children }: { title: string; children: ReactNode }) {
   return (
      <div className="flex flex-col gap-2 text-sm">
         <h3 className="font-medium">{title}</h3>
         {children}
      </div>
   );
}

// Learning goal and outcome per language (read-only).
export function ModuleIntroduction({ module }: { module?: ModuleDetail }) {
   return (
      <LanguageTabs>
         {(language) => {
            const { goal, outcome } = getContent(module, language);
            const textClass = cn('text-muted-foreground', language === 'my' && 'font-myanmar');
            return (
               <div className="flex flex-col gap-3">
                  <IntroBlock title="Learning goal">
                     <p className={textClass}>{goal || EMPTY_VALUE}</p>
                  </IntroBlock>
                  <IntroBlock title="Learning outcome">
                     {outcome ? (
                        <RichTextView html={outcome} className={textClass} />
                     ) : (
                        <p className={textClass}>{EMPTY_VALUE}</p>
                     )}
                  </IntroBlock>
               </div>
            );
         }}
      </LanguageTabs>
   );
}
