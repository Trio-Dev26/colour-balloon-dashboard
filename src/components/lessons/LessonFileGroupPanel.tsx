'use client';

import { BookOpenIcon, DownloadIcon, PresentationIcon, type LucideIcon } from 'lucide-react';
import { FileDropzone } from '@/components/common/FileDropzone';
import { IconTile } from '@/components/common/IconTile';
import { ToneBadge } from '@/components/common/ToneBadge';
import { LESSON_FILE_MAX_BYTES } from '@/constants/lessonFile';
import { useLessonFileUploads } from '@/hooks/useLessonFileUploads';
import { formatFileSize } from '@/lib/format';
import type { LessonFile, LessonFileGroup } from '@/types/api/lessonFile.types';
import type { LessonFileGroupConfig } from '@/types/ui/lessonFile.types';
import { LessonFileList } from './LessonFileList';
import { LessonFileUploadRow } from './LessonFileUploadRow';

const GROUP_ICONS: Record<LessonFileGroup, LucideIcon> = {
   STUDENT_VIEW: BookOpenIcon,
   STUDENT_DOWNLOAD: DownloadIcon,
   TEACHER_VIEW: PresentationIcon,
   TEACHER_DOWNLOAD: DownloadIcon,
};

interface LessonFileGroupPanelProps {
   lessonId: string;
   config: LessonFileGroupConfig;
   /** The group's saved files, in order. */
   files: LessonFile[];
   onEditCaption: (file: LessonFile) => void;
}

// One file group of a lesson: its files, uploads in progress, and a dropzone for more (FR-FILE-001..003).
export function LessonFileGroupPanel({ lessonId, config, files, onEditCaption }: LessonFileGroupPanelProps) {
   const { uploads, start, retry, dismiss } = useLessonFileUploads(lessonId, config);
   const hasRows = files.length > 0 || uploads.length > 0;

   return (
      <section className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-xs">
         <div className="flex items-start gap-3">
            <IconTile icon={GROUP_ICONS[config.group]} size="sm" />
            <div className="flex min-w-0 flex-col gap-0.5">
               <h4 className="flex items-center gap-2 text-sm font-semibold">
                  {config.title}
                  <ToneBadge tone={files.length > 0 ? 'primary' : 'neutral'}>
                     {files.length} {files.length === 1 ? 'file' : 'files'}
                  </ToneBadge>
               </h4>
               <p className="text-xs text-muted-foreground">{config.description}</p>
            </div>
         </div>
         {hasRows && (
            <div className="overflow-hidden rounded-lg border">
               {files.length > 0 && (
                  <LessonFileList
                     lessonId={lessonId}
                     group={config.group}
                     files={files}
                     onEditCaption={onEditCaption}
                  />
               )}
               {uploads.length > 0 && (
                  <ul className="divide-y border-t first:border-t-0">
                     {uploads.map((upload) => (
                        <LessonFileUploadRow
                           key={upload.id}
                           upload={upload}
                           onRetry={() => retry(upload.id)}
                           onDismiss={() => dismiss(upload.id)}
                        />
                     ))}
                  </ul>
               )}
            </div>
         )}
         <FileDropzone
            accept={config.accept}
            hint={`${config.formats} · Max ${formatFileSize(LESSON_FILE_MAX_BYTES)} each`}
            onFilesSelect={start}
            compact={hasRows}
            multiple
         />
      </section>
   );
}
