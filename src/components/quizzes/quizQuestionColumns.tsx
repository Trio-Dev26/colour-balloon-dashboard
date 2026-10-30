import { XIcon } from 'lucide-react';
import type { DataTableColumn } from '@/components/common/DataTable';
import { OrderBadge } from '@/components/common/OrderBadge';
import { TableLink } from '@/components/common/TableLink';
import { Button } from '@/components/ui/button';
import { pointsLabel, QUESTION_TYPE_LABELS } from '@/constants/question';
import { ROUTES } from '@/constants/routes';
import type { QuizQuestion } from '@/types/api/quiz.types';

// Columns of the Questions table on the quiz detail page, in quiz order. `showUnit` adds a Unit
// column for the Chapter End Test, whose questions come from all the module's units (D16).
export function getQuizQuestionColumns(
   onRemove: (question: QuizQuestion) => void,
   showUnit: boolean
): DataTableColumn<QuizQuestion>[] {
   const unitColumn: DataTableColumn<QuizQuestion> = {
      id: 'unit',
      header: 'Unit',
      className: 'w-[90px]',
      cell: (question) => <TableLink href={ROUTES.unitDetail(question.unit.id)}>{question.unit.code}</TableLink>,
   };

   return [
      {
         id: 'order',
         header: 'No',
         className: 'w-[64px] px-2 text-center',
         cell: (question) => <OrderBadge order={question.sequence} />,
      },
      { id: 'code', header: 'Code', className: 'w-[90px]', cell: (question) => question.code },
      { id: 'prompt', header: 'Question', className: 'w-[380px]', cell: (question) => question.promptText },
      ...(showUnit ? [unitColumn] : []),
      {
         id: 'type',
         header: 'Type',
         className: 'w-[140px]',
         cell: (question) => QUESTION_TYPE_LABELS[question.type],
      },
      { id: 'points', header: 'Points', className: 'w-[80px]', cell: (question) => pointsLabel(question.points) },
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
