'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { CaptionedFile } from '@/hooks/useLessonFileUploads';
import { LessonFileUploadForm } from './LessonFileUploadForm';

interface LessonFileUploadDialogProps {
   /** Files waiting for captions; empty = closed. */
   files: File[];
   groupTitle: string;
   onUpload: (items: CaptionedFile[]) => void;
   onCancel: () => void;
}

export function LessonFileUploadDialog({ files, groupTitle, onUpload, onCancel }: LessonFileUploadDialogProps) {
   return (
      <Dialog open={files.length > 0} onOpenChange={(open) => !open && onCancel()}>
         <DialogContent showCloseButton={false} className="gap-0 p-0 sm:max-w-160">
            {/* Remounting per batch gives a fresh form each time. */}
            {files.length > 0 && (
               <LessonFileUploadForm files={files} groupTitle={groupTitle} onUpload={onUpload} onCancel={onCancel} />
            )}
         </DialogContent>
      </Dialog>
   );
}
