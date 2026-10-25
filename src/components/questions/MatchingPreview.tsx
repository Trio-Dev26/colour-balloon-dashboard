'use client';

import { useState } from 'react';
import { shuffle } from '@/lib/shuffle';
import type { QuestionAnswersByType } from '@/types/api/question.types';
import { PreviewItem } from './PreviewItem';
import { PreviewSelect } from './PreviewSelect';

const LETTERS = 'ABCDEFGHIJKLMNOPQRST';

interface MatchingPreviewProps {
   answers: QuestionAnswersByType['MATCHING'];
   mediaUrls: Record<string, string>;
}

// FR-QB-006: left sides in order, right sides shuffled and lettered; the learner picks a letter for each left side.
export function MatchingPreview({ answers, mediaUrls }: MatchingPreviewProps) {
   const [rights] = useState(() => shuffle(answers.pairs.map((pair) => pair.right)));
   const letters = rights.map((_, index) => LETTERS[index]);

   return (
      <div className="grid gap-6 sm:grid-cols-2">
         <ol className="flex flex-col gap-3">
            {answers.pairs.map((pair, index) => (
               <li key={pair.id ?? index} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                  <span className="w-5 shrink-0 text-sm font-semibold">{index + 1}.</span>
                  <div className="flex-1">
                     <PreviewItem item={pair.left} mediaUrls={mediaUrls} />
                  </div>
                  <PreviewSelect label={`Match for ${index + 1}`} options={letters} placeholder="—" />
               </li>
            ))}
         </ol>
         <ul className="flex flex-col gap-3">
            {rights.map((right, index) => (
               <li key={letters[index]} className="flex items-center gap-3 rounded-lg border bg-muted p-3">
                  <span className="w-5 shrink-0 text-sm font-semibold">{letters[index]}</span>
                  <PreviewItem item={right} mediaUrls={mediaUrls} />
               </li>
            ))}
         </ul>
      </div>
   );
}
