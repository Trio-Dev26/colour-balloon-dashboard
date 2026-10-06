import type { ReactNode } from 'react';
import { InfoIcon } from 'lucide-react';

export function InfoAlert({ children }: { children: ReactNode }) {
   return (
      <div
         role="note"
         className="flex items-start gap-3 rounded-lg bg-info px-3 py-2 text-sm font-medium text-info-foreground"
      >
         <InfoIcon className="mt-0.5 size-4 shrink-0" />
         <p>{children}</p>
      </div>
   );
}
