'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { apiErrorMessage } from '@/lib/form';
import { CreateButton } from '@/components/common/CreateButton';
import { DataTable } from '@/components/common/DataTable';
import { ListFooter } from '@/components/common/ListFooter';
import { TablePagination } from '@/components/common/TablePagination';
import { ModuleUnitFilters } from '@/components/units/ModuleUnitFilters';
import { Button } from '@/components/ui/button';
import { QUESTION_FILTER_KEYS, QUESTION_TYPE_OPTIONS } from '@/constants/question';
import { ROUTES } from '@/constants/routes';
import { useDeleteQuestion, useQuestions } from '@/hooks/useQuestions';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import type { QuestionFilters } from '@/types/api/question.types';
import { QuestionEmptyState } from './QuestionEmptyState';
import { getQuestionListColumns } from './questionListColumns';

const createQuestionButton = <CreateButton label="Create question" href={ROUTES.newQuestion} />;
const filterProps = {
   filterKeys: QUESTION_FILTER_KEYS,
   searchPlaceholder: 'Search question, code',
   searchLabel: 'Search questions',
   typeOptions: QUESTION_TYPE_OPTIONS,
};

export function QuestionListView() {
   const { get, page, setPage } = useUrlFilters();
   const filters = {
      page,
      ...Object.fromEntries(QUESTION_FILTER_KEYS.map((key) => [key, get(key)])),
   } as QuestionFilters;
   const hasActiveFilters = QUESTION_FILTER_KEYS.some((key) => get(key));

   const { data, isPending, isError, refetch } = useQuestions(filters);
   const { mutate: deleteQuestion } = useDeleteQuestion();

   const columns = useMemo(
      () =>
         getQuestionListColumns((question) =>
            deleteQuestion(question.id, {
               onSuccess: () => toast.success(`${question.code} deleted`),
               onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${question.code}.`)),
            })
         ),
      [deleteQuestion]
   );

   const total = data?.meta.total ?? 0;
   const pageCount = data ? Math.ceil(total / data.meta.limit) : 0;

   if (isError) {
      return (
         <div className="flex flex-col items-center gap-3 p-10 text-sm text-muted-foreground">
            Couldn&apos;t load questions.
            <Button variant="outline" onClick={() => refetch()}>
               Try again
            </Button>
         </div>
      );
   }

   // The empty illustration means "nothing created yet", not "no match for these filters".
   if (!isPending && total === 0 && !hasActiveFilters) {
      return (
         <>
            <ModuleUnitFilters {...filterProps} />
            <QuestionEmptyState action={createQuestionButton} />
         </>
      );
   }

   return (
      <>
         <ModuleUnitFilters {...filterProps} action={createQuestionButton} />
         <div className="overflow-hidden rounded-lg border">
            <DataTable
               columns={columns}
               rows={data?.data ?? []}
               getRowId={(question) => question.id}
               getRowHref={(question) => ROUTES.questionPreview(question.id)}
               emptyMessage="No questions match these filters."
               isLoading={isPending}
            />
         </div>
         <ListFooter
            summary={data ? `Total ${total} questions are created.` : ''}
            pagination={<TablePagination page={page} pageCount={pageCount} onPageChange={setPage} />}
         />
      </>
   );
}
