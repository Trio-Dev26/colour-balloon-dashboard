import { ArrowRightIcon } from 'lucide-react';
import { ToneBadge } from '@/components/common/ToneBadge';
import { CHOICE_LETTERS, sequenceSlotWord, TRUE_FALSE_CHOICES } from '@/constants/question';
import type { QuestionAnswersByType, QuestionDetail } from '@/types/api/question.types';
import { AnswerKeyRow } from './AnswerKeyRow';
import { PreviewItem } from './PreviewItem';

const LIST = 'flex flex-col gap-2';

// The answers of a saved question with the correct ones marked (admin view of FR-QB-003..007): options with the
// right one in green, True / False, accepted answers per blank, the matching pairs, the steps in order.
export function AnswerKey({ question }: { question: Pick<QuestionDetail, 'type' | 'answers' | 'mediaUrls'> }) {
   const { answers, mediaUrls } = question;

   switch (question.type) {
      case 'MULTIPLE_CHOICE':
         return (
            <ol className={LIST}>
               {(answers as QuestionAnswersByType['MULTIPLE_CHOICE']).options.map((option, index) => (
                  <AnswerKeyRow key={option.id ?? index} marker={CHOICE_LETTERS[index]} correct={option.correct}>
                     <PreviewItem item={option} mediaUrls={mediaUrls} />
                  </AnswerKeyRow>
               ))}
            </ol>
         );
      case 'TRUE_FALSE': {
         const { correct } = answers as QuestionAnswersByType['TRUE_FALSE'];
         return (
            <ol className={LIST}>
               {TRUE_FALSE_CHOICES.map((choice) => (
                  <AnswerKeyRow key={choice.value} marker={choice.letter} correct={String(correct) === choice.value}>
                     {choice.label}
                  </AnswerKeyRow>
               ))}
            </ol>
         );
      }
      case 'FILL_BLANK':
         return (
            <ol className={LIST} aria-label="Accepted answers per blank">
               {(answers as QuestionAnswersByType['FILL_BLANK']).blanks.map((blank, index) => (
                  <AnswerKeyRow key={index} marker={String(index + 1)}>
                     <span className="flex flex-wrap gap-1.5">
                        {blank.accepted.map((answer) => (
                           <ToneBadge key={answer} tone="success" className="bg-success-border text-sm">
                              {answer}
                           </ToneBadge>
                        ))}
                     </span>
                  </AnswerKeyRow>
               ))}
            </ol>
         );
      case 'MATCHING':
         return (
            <ol className={LIST} aria-label="Matching pairs">
               {(answers as QuestionAnswersByType['MATCHING']).pairs.map((pair, index) => (
                  <AnswerKeyRow key={pair.id ?? index} marker={String(index + 1)}>
                     <span className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <PreviewItem item={pair.left} mediaUrls={mediaUrls} />
                        <ArrowRightIcon className="size-4 text-muted-foreground" aria-label="matches" />
                        <PreviewItem item={pair.right} mediaUrls={mediaUrls} />
                     </span>
                  </AnswerKeyRow>
               ))}
            </ol>
         );
      case 'SEQUENCE': {
         const { steps } = answers as QuestionAnswersByType['SEQUENCE'];
         return (
            <ol className={LIST} aria-label="Steps in the correct order">
               {steps.map((step, index) => (
                  <AnswerKeyRow key={step.id ?? index} marker={String(index + 1)}>
                     <span className="flex items-center justify-between gap-3">
                        <PreviewItem item={step} mediaUrls={mediaUrls} />
                        <span className="shrink-0 text-xs text-muted-foreground">
                           {sequenceSlotWord(index, steps.length)}
                        </span>
                     </span>
                  </AnswerKeyRow>
               ))}
            </ol>
         );
      }
   }
}
