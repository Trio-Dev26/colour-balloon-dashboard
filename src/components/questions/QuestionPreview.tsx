import type { QuestionPreviewData } from '@/types/ui/question.types';
import { AnswersPreview } from './AnswersPreview';
import { QuestionPrompt } from './QuestionPrompt';

// The question as a learner sees it (FR-QB-008): prompt, prompt images, then the answer area.
// No correct answers and no explanation. Used beside the create / edit form.
export function QuestionPreview({ question }: { question: QuestionPreviewData }) {
   return (
      <section className="flex max-w-3xl flex-col gap-5 rounded-xl border bg-card p-6 shadow-xs">
         <div className="flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
            <span>Learner preview</span>
            <span>
               {question.points} point{question.points === 1 ? '' : 's'}
            </span>
         </div>
         <QuestionPrompt {...question} />
         <AnswersPreview question={question} />
      </section>
   );
}
