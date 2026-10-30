import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { TableLink } from '@/components/common/TableLink';
import { pointsLabel, QUESTION_TYPE_LABELS, questionInUseReason } from '@/constants/question';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { QuestionListItem } from '@/types/api/question.types';

// Columns of the question bank list (FR-QB-001): prompt, type, points, unit, module, last updated.
export function getQuestionListColumns(
   onDelete: (question: QuestionListItem) => void
): DataTableColumn<QuestionListItem>[] {
   return [
      { id: 'code', header: 'Code', className: 'w-[90px]', cell: (question) => question.code },
      { id: 'prompt', header: 'Question', className: 'w-[340px]', cell: (question) => question.promptText },
      {
         id: 'type',
         header: 'Type',
         className: 'w-[140px]',
         cell: (question) => QUESTION_TYPE_LABELS[question.type],
      },
      { id: 'points', header: 'Points', className: 'w-[80px]', cell: (question) => pointsLabel(question.points) },
      {
         id: 'unit',
         header: 'Unit code',
         className: 'w-[100px]',
         cell: (question) => <TableLink href={ROUTES.unitDetail(question.unitId)}>{question.unitCode}</TableLink>,
      },
      {
         id: 'module',
         header: 'Module code',
         className: 'w-[110px]',
         cell: (question) => <TableLink href={ROUTES.moduleDetail(question.moduleId)}>{question.moduleCode}</TableLink>,
      },
      {
         id: 'updatedAt',
         header: 'Last updated',
         className: 'w-[150px] text-xs text-muted-foreground',
         cell: (question) => formatDateTime(question.updatedAt),
      },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[96px]',
         cell: (question) => (
            <RowActions
               entityName="question"
               edit={ROUTES.editQuestion(question.id)}
               onDelete={() => onDelete(question)}
               // D18: a question in a quiz can't be deleted.
               deleteDisabledReason={questionInUseReason(question.quizCodes)}
            />
         ),
      },
   ];
}
