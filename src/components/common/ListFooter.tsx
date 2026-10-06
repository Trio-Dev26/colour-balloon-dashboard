import type { ReactNode } from 'react';

// Row under a table: summary text on the left, pagination on the right.
export function ListFooter({ summary, pagination }: { summary: string; pagination?: ReactNode }) {
   return (
      <div className="flex items-center justify-between gap-4">
         <p className="text-xs text-muted-foreground">{summary}</p>
         {pagination}
      </div>
   );
}
