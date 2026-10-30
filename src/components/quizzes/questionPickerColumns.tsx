import type { DataTableColumn } from '@/components/common/DataTable';
import { pointsLabel, QUESTION_TYPE_LABELS } from '@/constants/question';
import type { QuestionListItem } from '@/types/api/question.types';

interface PickerState {
   /** Already in the quiz: shown ticked and disabled (a question appears once per quiz). */
   addedIds: ReadonlySet<string>;
   selectedIds: ReadonlySet<string>;
   onToggle: (id: string) => void;
}

// Columns of the "Add questions" picker (FR-QUIZ-005).
export function getQuestionPickerColumns({
   addedIds,
   selectedIds,
   onToggle,
}: PickerState): DataTableColumn<QuestionListItem>[] {
   return [
      {
         id: 'select',
         header: '',
         className: 'w-[44px] text-center',
         cell: (question) => (
            <input
               type="checkbox"
               aria-label={`Select ${question.code}`}
               className="size-4 accent-primary"
               checked={addedIds.has(question.id) || selectedIds.has(question.id)}
               disabled={addedIds.has(question.id)}
               onChange={() => onToggle(question.id)}
            />
         ),
      },
      { id: 'code', header: 'Code', className: 'w-[80px]', cell: (question) => question.code },
      { id: 'prompt', header: 'Question', className: 'w-[300px]', cell: (question) => question.promptText },
      {
         id: 'type',
         header: 'Type',
         className: 'w-[130px]',
         cell: (question) => QUESTION_TYPE_LABELS[question.type],
      },
      { id: 'points', header: 'Points', className: 'w-[70px]', cell: (question) => pointsLabel(question.points) },
      { id: 'unit', header: 'Unit', className: 'w-[80px]', cell: (question) => question.unitCode },
   ];
}
