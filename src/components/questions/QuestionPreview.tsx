import { RichTextView } from '@/components/common/rich-text/RichTextView';
import { BLANK_MARKER } from '@/constants/question';
import type { QuestionDetail } from '@/types/api/question.types';
import { AnswersPreview } from './AnswersPreview';

/** Fill-in-the-blank: each ___ becomes a numbered gap matching the answer boxes below (D23). */
const withNumberedBlanks = (html: string) => {
   let blank = 0;
   return html.replace(BLANK_MARKER, () => `<u>&nbsp;&nbsp;&nbsp;(${(blank += 1)})&nbsp;&nbsp;&nbsp;</u>`);
};

// The question as a learner sees it (FR-QB-008): prompt, prompt images, then the answer area.
// No correct answers and no explanation.
export function QuestionPreview({ question }: { question: QuestionDetail }) {
   const prompt = question.type === 'FILL_BLANK' ? withNumberedBlanks(question.prompt) : question.prompt;

   return (
      <section className="flex max-w-3xl flex-col gap-5 rounded-xl border bg-card p-6 shadow-xs">
         <div className="flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
            <span>Learner preview</span>
            <span>
               {question.points} point{question.points === 1 ? '' : 's'}
            </span>
         </div>
         <RichTextView html={prompt} className="text-base" />
         {question.promptMediaIds.length > 0 && (
            <div className="flex flex-wrap gap-3">
               {question.promptMediaIds.map((id) => (
                  // Plain <img>: signed URLs are short-lived and can't go through next/image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                     key={id}
                     src={question.mediaUrls[id]}
                     alt=""
                     className="max-h-48 rounded-lg border object-contain"
                  />
               ))}
            </div>
         )}
         <AnswersPreview question={question} />
      </section>
   );
}
