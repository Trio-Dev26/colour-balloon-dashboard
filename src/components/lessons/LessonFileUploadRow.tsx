import { CircleAlertIcon, LoaderCircleIcon, RotateCwIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/format';
import type { PendingUpload } from '@/types/ui/lessonFile.types';

const PERCENT = 100;

interface LessonFileUploadRowProps {
   upload: PendingUpload;
   onRetry: () => void;
   onDismiss: () => void;
}

// A file on its way up (progress bar) or one that failed (reason, Retry / Dismiss) (FR-FILE-002).
export function LessonFileUploadRow({ upload, onRetry, onDismiss }: LessonFileUploadRowProps) {
   const percent = Math.round(upload.progress * PERCENT);
   const failed = upload.error !== undefined;

   return (
      <li className="flex items-center gap-3 px-3 py-2.5">
         {failed ? (
            <CircleAlertIcon className="size-5 shrink-0 text-destructive" aria-hidden />
         ) : (
            <LoaderCircleIcon className="size-5 shrink-0 animate-spin text-primary" aria-hidden />
         )}
         <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="truncate text-sm font-medium">
               {upload.file.name}
               <span className="ml-2 text-xs font-normal text-muted-foreground">
                  {formatFileSize(upload.file.size)}
               </span>
            </p>
            {failed ? (
               <p className="text-xs text-destructive">Failed: {upload.error}</p>
            ) : (
               <div
                  className="h-1.5 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label={`Uploading ${upload.file.name}`}
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={PERCENT}
               >
                  <div className="h-full bg-primary transition-[width]" style={{ width: `${percent}%` }} />
               </div>
            )}
         </div>
         {failed ? (
            <div className="flex items-center gap-1">
               {upload.retryable && (
                  <Button variant="ghost" size="icon" aria-label={`Retry ${upload.file.name}`} onClick={onRetry}>
                     <RotateCwIcon />
                  </Button>
               )}
               <Button variant="ghost" size="icon" aria-label={`Dismiss ${upload.file.name}`} onClick={onDismiss}>
                  <XIcon />
               </Button>
            </div>
         ) : (
            <span className="w-10 text-right text-xs text-muted-foreground">{percent}%</span>
         )}
      </li>
   );
}
