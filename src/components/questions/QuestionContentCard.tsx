'use client';

import { useState } from 'react';
import { CardSection } from '@/components/common/CardSection';
import { LanguageTabsList } from '@/components/common/LanguageTabsList';
import { RichTextView } from '@/components/common/rich-text/RichTextView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LANGUAGES } from '@/constants/common';
import { hasEnglishVersion, QUESTION_LANGUAGES } from '@/constants/question';
import { cn } from '@/lib/utils';
import type { QuestionDetail } from '@/types/api/question.types';
import type { LanguageCode } from '@/types/ui/common.types';
import { AnswerKey } from './AnswerKey';
import { AnswersPreview } from './AnswersPreview';
import { QuestionPrompt } from './QuestionPrompt';

const VIEWS = [
   { value: 'key', label: 'Answer key' },
   { value: 'learner', label: 'Learner view' },
] as const;

const FALLBACK_NOTE = 'No English translation yet, so learners see the Myanmar question.';
const MYANMAR_FONT = LANGUAGES.find((option) => option.value === 'my')?.className;

// CONTENT card of the question detail page, Myanmar-first (Q24): the question in Myanmar or its English
// translation (a missing one shows Myanmar, as learners would see it; fill in the blank is Myanmar only), then
// either the answer key (correct answers marked, plus the explanation) or the learner view (the interactive
// preview, nothing marked). Answers are shared.
export function QuestionContentCard({ question }: { question: QuestionDetail }) {
   const hasEnglish = hasEnglishVersion(question.type);
   const [language, setLanguage] = useState<LanguageCode>(QUESTION_LANGUAGES[0].value);
   const isEnglish = hasEnglish && language === 'en';
   const showsEnglishPrompt = isEnglish && Boolean(question.promptEn);
   const prompt = showsEnglishPrompt ? question.promptEn : question.promptMy;
   // An explanation in only one language is shown in both.
   const showsEnglishExplanation = isEnglish ? Boolean(question.explanationEn) : !question.explanationMy;
   const explanation = showsEnglishExplanation ? question.explanationEn : question.explanationMy;

   return (
      <Tabs value={language} onValueChange={(next: LanguageCode) => setLanguage(next)}>
         <CardSection title="Content" action={hasEnglish && <LanguageTabsList languages={QUESTION_LANGUAGES} />}>
            <div className="flex flex-col gap-5">
               <div className={cn('flex flex-col gap-2', !showsEnglishPrompt && MYANMAR_FONT)}>
                  <QuestionPrompt {...question} prompt={prompt} className="text-lg font-semibold" />
                  {isEnglish && !question.promptEn && <p className="text-xs text-muted-foreground">{FALLBACK_NOTE}</p>}
               </div>
               <Tabs defaultValue={VIEWS[0].value} className="gap-3">
                  <div className="flex items-center justify-between gap-3">
                     <span className="text-sm font-semibold">Answers</span>
                     <TabsList>
                        {VIEWS.map((view) => (
                           <TabsTrigger key={view.value} value={view.value} className="px-3">
                              {view.label}
                           </TabsTrigger>
                        ))}
                     </TabsList>
                  </div>
                  <TabsContent value="key" className="flex flex-col gap-5">
                     <AnswerKey question={question} />
                     {explanation && (
                        <div className="flex flex-col gap-1.5 rounded-lg bg-muted/60 p-3">
                           <span className="text-xs font-medium text-muted-foreground">
                              Explanation (shown after answering)
                              {isEnglish && !question.explanationEn && ' · Myanmar, no English version yet'}
                              {!isEnglish && !question.explanationMy && ' · English, no Myanmar version yet'}
                           </span>
                           <RichTextView
                              html={explanation}
                              className={cn('text-sm', !showsEnglishExplanation && MYANMAR_FONT)}
                           />
                        </div>
                     )}
                  </TabsContent>
                  <TabsContent value="learner">
                     <AnswersPreview question={{ ...question, prompt }} />
                  </TabsContent>
               </Tabs>
            </div>
         </CardSection>
      </Tabs>
   );
}
