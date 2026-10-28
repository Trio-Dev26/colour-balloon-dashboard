import { TriangleAlertIcon } from 'lucide-react';
import { OrderBadge } from '@/components/common/OrderBadge';
import { ToneBadge } from '@/components/common/ToneBadge';
import { formatFileSize } from '@/lib/format';
import type { LessonFile } from '@/types/api/lessonFile.types';
import { LessonFileCaptions } from './LessonFileCaptions';
import { LessonFileTypeTile } from './LessonFileTypeTile';

/** "worksheet.final.pdf" → "PDF" */
const extensionOf = (fileName: string) => fileName.split('.').pop()?.toUpperCase() ?? '';

interface LessonFileSummaryProps {
   file: LessonFile;
   /** Position to show; the saved sequence unless the list is being rearranged. */
   order: number;
}

// Order, type icon, name, type, size and captions of one lesson file (list rows and arrange mode).
// Files from before captions were required are flagged until both captions are added.
export function LessonFileSummary({ file, order }: LessonFileSummaryProps) {
   const hasCaptions = Boolean(file.captionEn && file.captionMy);

   return (
      <div className="flex min-w-48 flex-1 items-center gap-3">
         <OrderBadge order={order} />
         <LessonFileTypeTile contentType={file.contentType} />
         <div className="flex min-w-0 flex-col gap-1">
            <p className="flex min-w-0 items-center gap-2 text-sm font-medium">
               <span className="truncate">{file.fileName}</span>
               <span className="shrink-0 rounded bg-muted px-1.5 py-px text-xs font-medium text-muted-foreground">
                  {extensionOf(file.fileName)}
               </span>
               <span className="shrink-0 text-xs font-normal text-tertiary-foreground">
                  {formatFileSize(file.sizeBytes)}
               </span>
            </p>
            {hasCaptions ? (
               <LessonFileCaptions captions={{ en: file.captionEn ?? '', my: file.captionMy ?? '' }} />
            ) : (
               <ToneBadge tone="warning" className="h-auto gap-1 self-start whitespace-normal">
                  <TriangleAlertIcon className="size-3" aria-hidden />
                  Caption missing: add English and Myanmar captions
               </ToneBadge>
            )}
         </div>
      </div>
   );
}
