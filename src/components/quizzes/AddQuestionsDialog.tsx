'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { FilterSelect } from '@/components/common/FilterSelect';
import { DialogForm } from '@/components/common/form/DialogForm';
import { SearchInput } from '@/components/common/SearchInput';
import { TablePagination } from '@/components/common/TablePagination';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DEFAULT_PAGE } from '@/constants/common';
import { QUESTION_TYPE_OPTIONS } from '@/constants/question';
import { QUESTION_PICKER_PAGE_SIZE } from '@/constants/quiz';
import { useQuestions } from '@/hooks/useQuestions';
import { useUnitSelectOptions } from '@/hooks/useUnits';
import type { QuestionType } from '@/types/api/question.types';
import type { QuizDetail } from '@/types/api/quiz.types';
import { getQuestionPickerColumns } from './questionPickerColumns';

interface AddQuestionsDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   quiz: QuizDetail;
   isSaving: boolean;
   /** The picked question ids, in the order they were picked. */
   onAdd: (questionIds: string[]) => Promise<unknown>;
}

// Pick questions from the bank (FR-QUIZ-005): a unit quiz offers its unit's questions, the Chapter
// End Test any unit of its module (D16, D20). Search, filter by unit and type, multi-select.
export function AddQuestionsDialog({ open, onOpenChange, quiz, isSaving, onAdd }: AddQuestionsDialogProps) {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent showCloseButton={false} className="gap-0 p-0 sm:max-w-200">
            {/* Remounting on open gives fresh filters and selection each time. */}
            {open && <PickerBody quiz={quiz} isSaving={isSaving} onAdd={onAdd} onClose={() => onOpenChange(false)} />}
         </DialogContent>
      </Dialog>
   );
}

type PickerBodyProps = Pick<AddQuestionsDialogProps, 'quiz' | 'isSaving' | 'onAdd'> & { onClose: () => void };

function PickerBody({ quiz, isSaving, onAdd, onClose }: PickerBodyProps) {
   const [search, setSearch] = useState('');
   const [unitId, setUnitId] = useState<string>();
   const [type, setType] = useState<QuestionType>();
   const [page, setPage] = useState(DEFAULT_PAGE);
   const [selected, setSelected] = useState<string[]>([]);
   const unitOptions = useUnitSelectOptions(quiz.moduleId);

   const { data, isPending } = useQuestions(
      { moduleId: quiz.moduleId, unitId: quiz.unitId ?? unitId, type, search: search || undefined, page },
      QUESTION_PICKER_PAGE_SIZE
   );
   const pageCount = data ? Math.ceil(data.meta.total / data.meta.limit) : 0;

   const columns = useMemo(() => {
      const selectedIds = new Set(selected);
      return getQuestionPickerColumns({
         addedIds: new Set(quiz.questions.map((question) => question.id)),
         selectedIds,
         onToggle: (id) =>
            setSelected((ids) => (selectedIds.has(id) ? ids.filter((other) => other !== id) : [...ids, id])),
      });
   }, [quiz.questions, selected]);

   // Any filter change goes back to page 1.
   const filterBy =
      <T,>(set: (value: T) => void) =>
      (value: T) => {
         set(value);
         setPage(DEFAULT_PAGE);
      };

   return (
      <DialogForm
         title="Add questions"
         submitLabel={
            selected.length ? `Add ${selected.length} question${selected.length > 1 ? 's' : ''}` : 'Add questions'
         }
         isSubmitting={isSaving}
         onSubmit={(event) => {
            event.preventDefault();
            if (selected.length) onAdd(selected).then(onClose, () => {});
         }}
         onCancel={onClose}
      >
         <div className="flex flex-wrap items-center gap-3">
            <SearchInput
               placeholder="Search question, code"
               aria-label="Search questions"
               className="w-64"
               onChange={(event) => filterBy(setSearch)(event.target.value)}
            />
            {/* A unit quiz only uses its own unit's questions. */}
            {!quiz.unitId && (
               <FilterSelect
                  placeholder="Unit"
                  options={unitOptions}
                  value={unitId}
                  onValueChange={filterBy(setUnitId)}
               />
            )}
            <FilterSelect
               placeholder="Type"
               options={QUESTION_TYPE_OPTIONS}
               value={type}
               onValueChange={filterBy((value?: string) => setType(value as QuestionType | undefined))}
            />
         </div>
         <div className="overflow-hidden rounded-lg border">
            <DataTable
               columns={columns}
               rows={data?.data ?? []}
               getRowId={(question) => question.id}
               emptyMessage="No questions match. Create them in the Question Bank first."
               isLoading={isPending}
            />
         </div>
         <TablePagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </DialogForm>
   );
}
