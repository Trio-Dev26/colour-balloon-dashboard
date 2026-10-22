import { FileHeadphoneIcon, FileImageIcon, FilePlayIcon, FileTextIcon, type LucideIcon } from 'lucide-react';
import { IconTile } from '@/components/common/IconTile';
import { OrderBadge } from '@/components/common/OrderBadge';
import { formatFileSize } from '@/lib/format';
import type { LessonFile } from '@/types/api/lessonFile.types';
import type { Tone } from '@/types/ui/common.types';

// By the detected content type; PDFs (and anything else) get the document icon.
const TYPE_ICONS: [prefix: string, icon: LucideIcon, tone: Tone][] = [
   ['video/', FilePlayIcon, 'info'],
   ['audio/', FileHeadphoneIcon, 'warning'],
   ['image/', FileImageIcon, 'success'],
];

const iconFor = (contentType: string): [LucideIcon, Tone] => {
   const match = TYPE_ICONS.find(([prefix]) => contentType.startsWith(prefix));
   return match ? [match[1], match[2]] : [FileTextIcon, 'primary'];
};

/** "worksheet.final.pdf" → "PDF" */
const extensionOf = (fileName: string) => fileName.split('.').pop()?.toUpperCase() ?? '';

interface LessonFileSummaryProps {
   file: LessonFile;
   /** Position to show; the saved sequence unless the list is being rearranged. */
   order: number;
}

// Order, type icon, file name, type, size and captions of one lesson file (list rows and arrange mode).
export function LessonFileSummary({ file, order }: LessonFileSummaryProps) {
   const [icon, tone] = iconFor(file.contentType);

   return (
      <div className="flex min-w-0 flex-1 items-center gap-3">
         <OrderBadge order={order} />
         <IconTile icon={icon} tone={tone} />
         <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate text-sm font-medium">{file.fileName}</p>
            <p className="flex min-w-0 items-center gap-1.5 text-xs text-tertiary-foreground">
               <span className="rounded bg-muted px-1.5 py-px font-medium text-muted-foreground">
                  {extensionOf(file.fileName)}
               </span>
               <span className="shrink-0">{formatFileSize(file.sizeBytes)}</span>
               {(file.captionEn || file.captionMy) && (
                  <span className="truncate">
                     · {file.captionEn}
                     {file.captionMy && <span className="font-myanmar"> {file.captionMy}</span>}
                  </span>
               )}
            </p>
         </div>
      </div>
   );
}
