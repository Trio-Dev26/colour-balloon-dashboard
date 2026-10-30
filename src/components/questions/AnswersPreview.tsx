import { Input } from '@/components/ui/input';
import { CHOICE_LETTERS, TRUE_FALSE_CHOICES } from '@/constants/question';
import { ChoiceLetter } from './ChoiceLetter';
import type { QuestionAnswersByType } from '@/types/api/question.types';
import type { QuestionPreviewData } from '@/types/ui/question.types';
import { MatchingPreview } from './MatchingPreview';
import { PreviewChoice } from './PreviewChoice';
import { PreviewItem } from './PreviewItem';
import { SequencePreview } from './SequencePreview';

// The answer area for each question type as the learner sees it (FR-QB-008): no correct answers,
// matching right sides and sequence steps shuffled. Picks aren't saved or marked.
export function AnswersPreview({ question }: { question: QuestionPreviewData }) {
   const { answers, mediaUrls, id } = question;

   switch (question.type) {
      case 'MULTIPLE_CHOICE':
         return (
            <div className="flex flex-col gap-3">
               {(answers as QuestionAnswersByType['MULTIPLE_CHOICE']).options.map((option, index) => (
                  <PreviewChoice key={option.id ?? index} name={id}>
                     <ChoiceLetter letter={CHOICE_LETTERS[index]} />
                     <PreviewItem item={option} mediaUrls={mediaUrls} />
                  </PreviewChoice>
               ))}
            </div>
         );
      case 'TRUE_FALSE':
         return (
            <div className="grid grid-cols-2 gap-3">
               {TRUE_FALSE_CHOICES.map((choice) => (
                  <PreviewChoice key={choice.value} name={id}>
                     <ChoiceLetter letter={choice.letter} />
                     {choice.label}
                  </PreviewChoice>
               ))}
            </div>
         );
      case 'FILL_BLANK':
         return (
            <div className="flex flex-col gap-3">
               {(answers as QuestionAnswersByType['FILL_BLANK']).blanks.map((_, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm font-medium">
                     <span className="w-16 shrink-0">Blank {index + 1}</span>
                     <Input className="h-9" placeholder="Type your answer" />
                  </label>
               ))}
            </div>
         );
      case 'MATCHING':
         return <MatchingPreview answers={answers as QuestionAnswersByType['MATCHING']} mediaUrls={mediaUrls} />;
      case 'SEQUENCE':
         return <SequencePreview answers={answers as QuestionAnswersByType['SEQUENCE']} mediaUrls={mediaUrls} />;
   }
}
