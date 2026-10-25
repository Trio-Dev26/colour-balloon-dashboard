import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Small preview of an uploaded question image with a remove button.
export function QuestionImageThumb({ url, onRemove }: { url: string; onRemove: () => void }) {
   return (
      <div className="relative size-16 shrink-0">
         {/* Plain <img>: signed URLs are short-lived and can't go through next/image. */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img src={url} alt="" className="size-16 rounded-lg border bg-muted object-cover" />
         <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Remove image"
            className="absolute -top-2 -right-2 size-5 rounded-full border"
            onClick={onRemove}
         >
            <XIcon className="size-3" />
         </Button>
      </div>
   );
}
