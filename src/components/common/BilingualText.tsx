import { EMPTY_VALUE } from '@/constants/common';

// English line with its Myanmar translation underneath (table titles).
export function BilingualText({ en, my }: { en?: string; my?: string }) {
   return (
      <div className="flex min-w-0 flex-col gap-1">
         <span className="truncate text-sm text-foreground">{en || EMPTY_VALUE}</span>
         {my && <span className="truncate font-myanmar text-xs text-muted-foreground">{my}</span>}
      </div>
   );
}
