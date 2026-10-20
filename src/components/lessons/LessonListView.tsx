'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';
import { apiErrorMessage } from '@/lib/form';
import { CreateButton } from '@/components/common/CreateButton';
import { DataTable } from '@/components/common/DataTable';
import { ListFooter } from '@/components/common/ListFooter';
import { TablePagination } from '@/components/common/TablePagination';
import { Button } from '@/components/ui/button';
import { LESSON_FILTER_KEYS } from '@/constants/lesson';
import { ROUTES } from '@/constants/routes';
import { useDeleteLesson, useLessons } from '@/hooks/useLessons';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import type { LessonFilters as LessonFilterValues } from '@/types/api/lesson.types';
import { LessonEmptyState } from './LessonEmptyState';
import { LessonFilters } from './LessonFilters';
import { getLessonListColumns } from './lessonListColumns';

const createLessonButton = <CreateButton label="Create lesson" href={ROUTES.newLesson} />;

export function LessonListView() {
   const { get, page, setPage } = useUrlFilters();
   const filters: LessonFilterValues = {
      page,
      ...Object.fromEntries(LESSON_FILTER_KEYS.map((key) => [key, get(key)])),
   };
   const hasActiveFilters = LESSON_FILTER_KEYS.some((key) => get(key));

   const { data, isPending, isError, refetch } = useLessons(filters);
   const { mutate: deleteLesson } = useDeleteLesson();

   const columns = useMemo(
      () =>
         getLessonListColumns((lesson) =>
            deleteLesson(lesson.id, {
               onSuccess: () => toast.success(`${lesson.titleEn} deleted`),
               onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t delete ${lesson.titleEn}.`)),
            })
         ),
      [deleteLesson]
   );

   const total = data?.meta.total ?? 0;
   const pageCount = data ? Math.ceil(total / data.meta.limit) : 0;

   if (isError) {
      return (
         <div className="flex flex-col items-center gap-3 p-10 text-sm text-muted-foreground">
            Couldn&apos;t load lessons.
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
            <LessonFilters />
            <LessonEmptyState action={createLessonButton} />
         </>
      );
   }

   return (
      <>
         <LessonFilters action={createLessonButton} />
         <div className="overflow-hidden rounded-lg border">
            <DataTable
               columns={columns}
               rows={data?.data ?? []}
               getRowId={(lesson) => lesson.id}
               emptyMessage="No lessons match these filters."
               isLoading={isPending}
            />
         </div>
         <ListFooter
            summary={data ? `Total ${total} lessons are created.` : ''}
            pagination={<TablePagination page={page} pageCount={pageCount} onPageChange={setPage} />}
         />
      </>
   );
}
