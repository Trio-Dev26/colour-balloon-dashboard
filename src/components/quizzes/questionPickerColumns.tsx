import type { DataTableColumn } from '@/components/common/DataTable';
import { ToneBadge } from '@/components/common/ToneBadge';
import { TruncatedText } from '@/components/common/TruncatedText';
import { pointsLabel, QUESTION_TYPE_LABELS } from '@/constants/question';
import type { QuestionListItem } from '@/types/api/question.types';

interface PickerState {
   /** Already in the quiz: shown ticked and disabled (a question appears once per quiz). */
   addedIds: ReadonlySet<string>;
   selectedIds: ReadonlySet<string>;
   /** Questions on the current page that can still be picked. */
   pageIds: string[];
   onToggle: (id: string) => void;
   /** Selects every pickable question on the page, or clears them when all are selected. */
   onToggleAll: () => void;
}

// Columns of the "Add questions" picker (FR-QUIZ-005).
export function getQuestionPickerColumns({
   addedIds,
   selectedIds,
   pageIds,
   onToggle,
   onToggleAll,
}: PickerState): DataTableColumn<QuestionListItem>[] {
   const pickedOnPage = pageIds.filter((id) => selectedIds.has(id)).length;
   const allPicked = pageIds.length > 0 && pickedOnPage === pageIds.length;

   return [
      {
         id: 'select',
         header: (
            <input
               type="checkbox"
               aria-label="Select all questions on this page"
               className="size-4 align-middle accent-primary"
               checked={allPicked}
               disabled={pageIds.length === 0}
               // Some but not all picked: the dash state, which has no HTML attribute.
               ref={(input) => {
                  if (input) input.indeterminate = pickedOnPage > 0 && !allPicked;
               }}
               onChange={onToggleAll}
            />
         ),
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
      {
         id: 'prompt',
         header: 'Question',
         className: 'w-[300px]',
         // Questions already in the quiz say so up front, where the truncated text can't hide it.
         cell: (question) =>
            addedIds.has(question.id) ? (
               <div className="flex min-w-0 items-center gap-2">
                  <ToneBadge tone="success">Added</ToneBadge>
                  <TruncatedText text={question.promptText} />
               </div>
            ) : (
               question.promptText
            ),
      },
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
