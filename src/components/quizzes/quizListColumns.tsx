import { BilingualText } from '@/components/common/BilingualText';
import type { DataTableColumn } from '@/components/common/DataTable';
import { RowActions } from '@/components/common/RowActions';
import { TableLink } from '@/components/common/TableLink';
import { ToneBadge } from '@/components/common/ToneBadge';
import { EMPTY_VALUE } from '@/constants/common';
import { attemptsLabel, QUIZ_TYPE, requiredLabel } from '@/constants/quiz';
import { ROUTES } from '@/constants/routes';
import { formatDateTime } from '@/lib/format';
import type { QuizListItem } from '@/types/api/quiz.types';

// Columns of the quiz list (FR-QUIZ-001): title, question count, pass mark, total, attempts,
// Required/Optional, unit, module and last update.
export function getQuizListColumns(onDelete: (quiz: QuizListItem) => void): DataTableColumn<QuizListItem>[] {
   return [
      {
         id: 'title',
         header: 'Quiz title',
         className: 'w-[260px]',
         cell: (quiz) => <BilingualText en={quiz.titleEn} my={quiz.titleMy} />,
      },
      {
         id: 'type',
         header: 'Type',
         className: 'w-[150px]',
         cell: (quiz) => <ToneBadge tone={QUIZ_TYPE[quiz.type].tone}>{QUIZ_TYPE[quiz.type].label}</ToneBadge>,
      },
      { id: 'questions', header: 'Questions', className: 'w-[95px]', cell: (quiz) => quiz.questionCount },
      { id: 'pass', header: 'Passing score', className: 'w-[115px]', cell: (quiz) => `${quiz.passPercent}%` },
      { id: 'total', header: 'Total score', className: 'w-[100px]', cell: (quiz) => quiz.totalPoints },
      { id: 'attempts', header: 'Attempt', className: 'w-[100px]', cell: (quiz) => attemptsLabel(quiz.maxAttempts) },
      { id: 'required', header: 'Completion', className: 'w-[105px]', cell: (quiz) => requiredLabel(quiz.required) },
      {
         id: 'unit',
         header: 'Unit code',
         className: 'w-[95px]',
         cell: (quiz) =>
            quiz.unitId ? <TableLink href={ROUTES.unitDetail(quiz.unitId)}>{quiz.unitCode}</TableLink> : EMPTY_VALUE,
      },
      {
         id: 'module',
         header: 'Module code',
         className: 'w-[110px]',
         cell: (quiz) => <TableLink href={ROUTES.moduleDetail(quiz.moduleId)}>{quiz.moduleCode}</TableLink>,
      },
      {
         id: 'updatedAt',
         header: 'Last updated',
         className: 'w-[150px] text-xs text-muted-foreground',
         cell: (quiz) => formatDateTime(quiz.updatedAt),
      },
      {
         id: 'actions',
         header: 'Actions',
         className: 'w-[96px]',
         cell: (quiz) => (
            <RowActions entityName="quiz" edit={ROUTES.editQuiz(quiz.id)} onDelete={() => onDelete(quiz)} />
         ),
      },
   ];
}
