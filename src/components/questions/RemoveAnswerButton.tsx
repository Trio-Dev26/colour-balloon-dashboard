import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QUESTION_LIMITS } from '@/constants/question';

interface RemoveAnswerButtonProps {
   label: string;
   count: number;
   onClick: () => void;
   /** Rows without a visible field label don't need the offset that lines the button up with the input. */
   hideLabel?: boolean;
}

// Removes one option, pair or step; disabled while the list is at its minimum of 2.
export function RemoveAnswerButton({ label, count, onClick, hideLabel }: RemoveAnswerButtonProps) {
   return (
      <Button
         type="button"
         variant="ghost"
         size="icon"
         aria-label={label}
         className={hideLabel ? undefined : 'mt-7'}
         disabled={count <= QUESTION_LIMITS.minItems}
         onClick={onClick}
      >
         <Trash2Icon />
      </Button>
   );
}
