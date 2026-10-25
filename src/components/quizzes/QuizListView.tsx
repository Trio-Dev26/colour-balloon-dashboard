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
import { QUIZ_FILTER_KEYS, QUIZ_TYPE_OPTIONS } from '@/constants/quiz';
import { ROUTES } from '@/constants/routes';
import { useDeleteQuiz, useQuizzes } from '@/hooks/useQuizzes';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import type { QuizFilters } from '@/types/api/quiz.types';
import { QuizEmptyState } from './QuizEmptyState';
import { getQuizListColumns } from './quizListColumns';

const createQuizButton = <CreateButton label="Create quiz" href={ROUTES.newQuiz} />;
const filterProps = {
   filterKeys: QUIZ_FILTER_KEYS,
   searchPlaceholder: 'Search quiz title, code',
   searchLabel: 'Search quizzes',
   typeOptions: QUIZ_TYPE_OPTIONS,
};

export function QuizListView() {
   const { get, page, setPage } = useUrlFilters();
   const filters = {
      page,
      ...Object.fromEntries(QUIZ_FILTER_KEYS.map((key) => [key, get(key)])),
   } as QuizFilters;
   const hasActiveFilters = QUIZ_FILTER_KEYS.some((key) => get(key));

   const { data, isPending, isError, refetch } = useQuizzes(filters);
   const { mutate: deleteQuiz } = useDeleteQuiz();

   const columns = useMemo(
      () =>
         getQuizListColumns((quiz) =>
            deleteQuiz(quiz.id, {
               onSuccess: () => toast.success(`${quiz.titleEn} deleted`),
               onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${quiz.titleEn}.`)),
            })
         ),
      [deleteQuiz]
   );

   const total = data?.meta.total ?? 0;
   const pageCount = data ? Math.ceil(total / data.meta.limit) : 0;

   if (isError) {
      return (
         <div className="flex flex-col items-center gap-3 p-10 text-sm text-muted-foreground">
            Couldn&apos;t load quizzes.
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
            <QuizEmptyState action={createQuizButton} />
         </>
      );
   }

   return (
      <>
         <ModuleUnitFilters {...filterProps} action={createQuizButton} />
         <div className="overflow-hidden rounded-lg border">
            <DataTable
               columns={columns}
               rows={data?.data ?? []}
               getRowId={(quiz) => quiz.id}
               emptyMessage="No quizzes match these filters."
               isLoading={isPending}
            />
         </div>
         <ListFooter
            summary={data ? `Total ${total} quizzes are created.` : ''}
            pagination={<TablePagination page={page} pageCount={pageCount} onPageChange={setPage} />}
         />
      </>
   );
}
