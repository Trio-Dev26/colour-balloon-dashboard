'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { LessonFile } from '@/types/api/lessonFile.types';
import { LessonFileCaptionForm } from './LessonFileCaptionForm';

interface LessonFileCaptionDialogProps {
   /** The file whose caption is edited; null = closed. */
   file: LessonFile | null;
   onClose: () => void;
}

export function LessonFileCaptionDialog({ file, onClose }: LessonFileCaptionDialogProps) {
   return (
      <Dialog open={file !== null} onOpenChange={(open) => !open && onClose()}>
         <DialogContent showCloseButton={false} className="gap-0 p-0 sm:max-w-140">
            {/* Remounting per file gives a fresh form each time. */}
            {file && <LessonFileCaptionForm key={file.id} file={file} onClose={onClose} />}
         </DialogContent>
      </Dialog>
   );
}
