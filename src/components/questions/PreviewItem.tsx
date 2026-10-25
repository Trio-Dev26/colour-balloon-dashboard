import type { AnswerItem } from '@/types/api/question.types';

interface PreviewItemProps {
   item: AnswerItem;
   /** Signed URL per media id (QuestionDetail.mediaUrls). */
   mediaUrls: Record<string, string>;
}

// An option, matching side or step as the learner sees it: its image and/or text.
export function PreviewItem({ item, mediaUrls }: PreviewItemProps) {
   const imageUrl = item.mediaId ? mediaUrls[item.mediaId] : undefined;

   return (
      <span className="flex min-w-0 items-center gap-3">
         {imageUrl && (
            // Plain <img>: signed URLs are short-lived and can't go through next/image.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="size-16 shrink-0 rounded-lg border bg-muted object-cover" />
         )}
         {item.text && <span className="text-sm">{item.text}</span>}
      </span>
   );
}
