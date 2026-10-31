import type { ReactNode } from 'react';
import { CheckIcon } from 'lucide-react';
import { ToneBadge } from '@/components/common/ToneBadge';
import { cn } from '@/lib/utils';
import { ChoiceLetter } from './ChoiceLetter';

interface AnswerKeyRowProps {
   /** "A", "1"… */
   marker: string;
   /** Marks the row green with a "Correct answer" badge. */
   correct?: boolean;
   children: ReactNode;
}

// One row of a question's answer key: letter or number, the content, and the correct mark when it applies.
export function AnswerKeyRow({ marker, correct, children }: AnswerKeyRowProps) {
   return (
      <li
         className={cn(
            'flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2',
            correct && 'border-success-foreground/40 bg-success'
         )}
      >
         <ChoiceLetter letter={marker} />
         <div className="min-w-0 flex-1 text-sm">{children}</div>
         {correct && (
            <ToneBadge tone="success" className="gap-1 bg-success-border">
               <CheckIcon className="size-3" aria-hidden />
               Correct answer
            </ToneBadge>
         )}
      </li>
   );
}
