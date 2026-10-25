import type { ReactNode } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QUESTION_LIMITS } from '@/constants/question';

interface AnswerListProps {
   title: string;
   hint?: string;
   count: number;
   addLabel: string;
   onAdd: () => void;
   /** List-level error, e.g. "Mark exactly one option as correct". */
   error?: string;
   children: ReactNode;
}

// Rows of options, pairs or steps with an "Add" button; 2–20 rows (FR-QB-003, 006, 007).
export function AnswerList({ title, hint, count, addLabel, onAdd, error, children }: AnswerListProps) {
   return (
      <section className="flex flex-col gap-3">
         <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">{title}</h3>
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
         </div>
         <div className="flex flex-col gap-3">{children}</div>
         {error && <p className="text-sm text-destructive">{error}</p>}
         <Button
            type="button"
            variant="outline"
            className="self-start"
            disabled={count >= QUESTION_LIMITS.maxItems}
            onClick={onAdd}
         >
            <PlusIcon />
            {addLabel}
         </Button>
      </section>
   );
}
