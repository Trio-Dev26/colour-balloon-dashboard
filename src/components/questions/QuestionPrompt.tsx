import { RichTextView } from '@/components/common/rich-text/RichTextView';
import { BLANK_MARKER } from '@/constants/question';
import { htmlToText } from '@/lib/form';
import type { QuestionPreviewData } from '@/types/ui/question.types';

/** Fill-in-the-blank: each ___ becomes a numbered gap matching the answer rows below (D23). */
const withNumberedBlanks = (html: string) => {
   let blank = 0;
   return html.replace(BLANK_MARKER, () => `<u>&nbsp;&nbsp;&nbsp;(${(blank += 1)})&nbsp;&nbsp;&nbsp;</u>`);
};

type QuestionPromptProps = Pick<QuestionPreviewData, 'type' | 'prompt' | 'promptMediaIds' | 'mediaUrls'> & {
   className?: string;
};

// The question text (blanks numbered for fill in the blank) and its prompt images.
export function QuestionPrompt({ type, prompt, promptMediaIds, mediaUrls, className }: QuestionPromptProps) {
   const html = type === 'FILL_BLANK' ? withNumberedBlanks(prompt) : prompt;

   return (
      <>
         {htmlToText(html) ? (
            <RichTextView html={html} className={className ?? 'text-base'} />
         ) : (
            <p className="text-base text-muted-foreground italic">Your question will appear here.</p>
         )}
         {promptMediaIds.length > 0 && (
            <div className="flex flex-wrap gap-3">
               {promptMediaIds.map((id) => (
                  // Plain <img>: signed URLs are short-lived and can't go through next/image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={id} src={mediaUrls[id]} alt="" className="max-h-48 rounded-lg border object-contain" />
               ))}
            </div>
         )}
      </>
   );
}
