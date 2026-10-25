import { XIcon } from 'lucide-react';
import type { DataTableColumn } from '@/components/common/DataTable';
import { OrderBadge } from '@/components/common/OrderBadge';
import { Button } from '@/components/ui/button';
import { QUESTION_TYPE_LABELS } from '@/constants/question';
import type { QuizQuestion } from '@/types/api/quiz.types';

// Columns of the Questions table on the quiz detail page, in quiz order.
export function getQuizQuestionColumns(onRemove: (question: QuizQuestion) => void): DataTableColumn<QuizQuestion>[] {
   return [
      {
         id: 'order',
         header: 'No',
         className: 'w-[64px] px-2 text-center',
         cell: (question) => <OrderBadge order={question.sequence} />,
      },
      { id: 'code', header: 'Code', className: 'w-[90px]', cell: (question) => question.code },
      { id: 'prompt', header: 'Question', className: 'w-[380px]', cell: (question) => question.promptText },
      {
         id: 'type',
         header: 'Type',
         className: 'w-[140px]',
         cell: (question) => QUESTION_TYPE_LABELS[question.type],
      },
      { id: 'points', header: 'Points', className: 'w-[80px]', cell: (question) => question.points },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[80px] text-right',
         cell: (question) => (
            <Button
               variant="ghost"
               size="icon"
               aria-label={`Remove ${question.code} from the quiz`}
               onClick={() => onRemove(question)}
            >
               <XIcon />
            </Button>
         ),
      },
   ];
}
