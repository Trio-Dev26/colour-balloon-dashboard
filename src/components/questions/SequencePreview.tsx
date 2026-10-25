'use client';

import { useState } from 'react';
import { shuffle } from '@/lib/shuffle';
import type { QuestionAnswersByType } from '@/types/api/question.types';
import { PreviewItem } from './PreviewItem';
import { PreviewSelect } from './PreviewSelect';

interface SequencePreviewProps {
   answers: QuestionAnswersByType['SEQUENCE'];
   mediaUrls: Record<string, string>;
}

// FR-QB-007: steps shuffled; the learner gives each one its position.
export function SequencePreview({ answers, mediaUrls }: SequencePreviewProps) {
   const [steps] = useState(() => shuffle(answers.steps));
   const positions = steps.map((_, index) => String(index + 1));

   return (
      <ul className="flex flex-col gap-3">
         {steps.map((step, index) => (
            <li key={step.id ?? index} className="flex items-center gap-3 rounded-lg border bg-card p-3">
               <PreviewSelect label={`Position of step ${index + 1}`} options={positions} placeholder="#" />
               <PreviewItem item={step} mediaUrls={mediaUrls} />
            </li>
         ))}
      </ul>
   );
}
