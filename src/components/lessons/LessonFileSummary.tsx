import type { ReactNode } from 'react';
import { FileHeadphoneIcon, FileImageIcon, FilePlayIcon, FileTextIcon } from 'lucide-react';
import { OrderBadge } from '@/components/common/OrderBadge';
import { formatFileSize } from '@/lib/format';
import type { LessonFile } from '@/types/api/lessonFile.types';

const ICON_CLASS = 'size-5 shrink-0 text-primary';

// By the detected content type; PDFs (and anything else) get the document icon.
const TYPE_ICONS: [prefix: string, icon: ReactNode][] = [
   ['video/', <FilePlayIcon key="video" className={ICON_CLASS} aria-hidden />],
   ['audio/', <FileHeadphoneIcon key="audio" className={ICON_CLASS} aria-hidden />],
   ['image/', <FileImageIcon key="image" className={ICON_CLASS} aria-hidden />],
];
const DOCUMENT_ICON = <FileTextIcon className={ICON_CLASS} aria-hidden />;

const iconFor = (contentType: string) =>
   TYPE_ICONS.find(([prefix]) => contentType.startsWith(prefix))?.[1] ?? DOCUMENT_ICON;

interface LessonFileSummaryProps {
   file: LessonFile;
   /** Position to show; the saved sequence unless the list is being rearranged. */
   order: number;
}

// Order, type icon, file name, size and captions of one lesson file (list rows and arrange mode).
export function LessonFileSummary({ file, order }: LessonFileSummaryProps) {
   return (
      <div className="flex min-w-0 flex-1 items-center gap-3">
         <OrderBadge order={order} />
         {iconFor(file.contentType)}
         <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-sm font-medium">{file.fileName}</p>
            <p className="truncate text-xs text-muted-foreground">
               {formatFileSize(file.sizeBytes)}
               {file.captionEn && ` · ${file.captionEn}`}
               {file.captionMy && <span className="font-myanmar"> · {file.captionMy}</span>}
            </p>
         </div>
      </div>
   );
}
