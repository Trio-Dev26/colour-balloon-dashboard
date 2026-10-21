'use client';

import { FileDropzone } from '@/components/common/FileDropzone';
import { LESSON_FILE_MAX_BYTES } from '@/constants/lessonFile';
import { useLessonFileUploads } from '@/hooks/useLessonFileUploads';
import { formatFileSize } from '@/lib/format';
import type { LessonFile } from '@/types/api/lessonFile.types';
import type { LessonFileGroupConfig } from '@/types/ui/lessonFile.types';
import { LessonFileList } from './LessonFileList';
import { LessonFileUploadRow } from './LessonFileUploadRow';

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
      <section className="flex flex-col gap-3">
         <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">
               {config.title}
               <span className="ml-2 font-normal text-muted-foreground">({files.length})</span>
            </h4>
            <p className="text-xs text-muted-foreground">{config.description}</p>
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
            hint={`Supported formats: ${config.formats} (Max ${formatFileSize(LESSON_FILE_MAX_BYTES)} each)`}
            onFilesSelect={start}
            multiple
         />
      </section>
   );
}
