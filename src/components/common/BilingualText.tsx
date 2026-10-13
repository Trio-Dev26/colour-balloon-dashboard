import { EMPTY_VALUE } from '@/constants/common';
import { TruncatedText } from './TruncatedText';

// English line with its Myanmar translation underneath (table titles).
export function BilingualText({ en, my }: { en?: string; my?: string }) {
   return (
      <div className="flex min-w-0 flex-col gap-1">
         <TruncatedText text={en || EMPTY_VALUE} className="text-sm text-foreground" />
         {my && <TruncatedText text={my} className="font-myanmar text-xs text-muted-foreground" />}
      </div>
   );
}
