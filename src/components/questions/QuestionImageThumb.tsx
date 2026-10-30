import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SIZES = {
   /** Prompt images and labelled answer rows. */
   md: 'size-16',
   /** Compact answer rows (matching, multiple choice): same height as their h-11 inputs. */
   sm: 'size-11',
};

interface QuestionImageThumbProps {
   url: string;
   onRemove: () => void;
   size?: keyof typeof SIZES;
}

// Small preview of an uploaded question image with a remove button.
export function QuestionImageThumb({ url, onRemove, size = 'md' }: QuestionImageThumbProps) {
   return (
      <div className={cn('relative shrink-0', SIZES[size])}>
         {/* Plain <img>: signed URLs are short-lived and can't go through next/image. */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img src={url} alt="" className="size-full rounded-lg border bg-muted object-cover" />
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
