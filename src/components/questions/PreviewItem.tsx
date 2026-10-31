import type { AnswerItem } from '@/types/api/question.types';
import { cn } from '@/lib/utils';

interface PreviewItemProps {
   item: AnswerItem;
   /** Signed URL per media id (QuestionDetail.mediaUrls). */
   mediaUrls: Record<string, string>;
   /** Picture card: the whole picture on top, the text under it (matching). Inline puts a thumbnail beside it. */
   stacked?: boolean;
}

// An option, matching side or step as the learner sees it: its image and/or text. Long words wrap
// instead of spilling out of the card.
export function PreviewItem({ item, mediaUrls, stacked }: PreviewItemProps) {
   const imageUrl = item.mediaId ? mediaUrls[item.mediaId] : undefined;

   return (
      // Inline wraps: on a narrow card the text drops under the picture instead of squeezing beside it.
      <span className={cn('flex min-w-0', stacked ? 'flex-col gap-2' : 'flex-wrap items-center gap-x-3 gap-y-1.5')}>
         {imageUrl && (
            // Plain <img>: signed URLs are short-lived and can't go through next/image.
            // eslint-disable-next-line @next/next/no-img-element
            <img
               src={imageUrl}
               alt=""
               draggable={false}
               className={cn(
                  'shrink-0 rounded-lg border bg-muted',
                  // object-contain shows the whole picture; cropping could hide the part that matters.
                  stacked ? 'aspect-4/3 w-full object-contain' : 'size-16 object-cover'
               )}
            />
         )}
         {item.text && (
            <span className={cn('min-w-0 text-sm break-words', imageUrl && !stacked && 'min-w-24 flex-1')}>
               {item.text}
            </span>
         )}
      </span>
   );
}
