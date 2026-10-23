import { formatFileSize } from '@/lib/format';
import { LessonFileTypeTile } from './LessonFileTypeTile';

interface LessonFileHeadingProps {
   name: string;
   contentType: string;
   sizeBytes: number;
}

// Type icon, name and size of the file whose captions are being written (caption dialogs).
export function LessonFileHeading({ name, contentType, sizeBytes }: LessonFileHeadingProps) {
   return (
      <div className="flex min-w-0 items-center gap-3">
         <LessonFileTypeTile contentType={contentType} />
         <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="text-xs text-tertiary-foreground">{formatFileSize(sizeBytes)}</p>
         </div>
      </div>
   );
}
