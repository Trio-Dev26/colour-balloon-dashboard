'use client';

import { useState, type ReactNode } from 'react';
import { ArrowUpDownIcon } from 'lucide-react';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { HintTooltip } from '@/components/common/HintTooltip';
import { ArrangeList, type ArrangeListProps } from './ArrangeList';

const MIN_ITEMS_TO_ARRANGE = 2;

interface OrderedChildrenSectionProps<T> {
   title: string;
   description: string;
   /** Header button (e.g. "+ Create unit"); shown only when there are items — the empty state has its own. */
   createAction: ReactNode;
   /** Optional note between the header and the table. */
   alert?: ReactNode;
   items: T[];
   columns: DataTableColumn<T>[];
   getId: (item: T) => string;
   emptyState: ReactNode;
   arrange: Pick<ArrangeListProps<T>, 'renderItem' | 'getHandleLabel' | 'hint' | 'isSaving'> & {
      buttonLabel: string;
      /** When set, the arrange button is disabled and this explains why on hover. */
      disabledReason?: string;
      /** Persist the new order; the section leaves arrange mode once it resolves. */
      onSave: (ids: string[]) => Promise<unknown>;
   };
}

// Children of a parent in unlock order — a module's units, a unit's lessons — with an
// "Arrange …" drag-and-drop mode (FR-CUR-006).
export function OrderedChildrenSection<T>({
   title,
   description,
   createAction,
   alert,
   items,
   columns,
   getId,
   emptyState,
   arrange,
}: OrderedChildrenSectionProps<T>) {
   const [isArranging, setIsArranging] = useState(false);
   const hasItems = items.length > 0;

   return (
      <section className="flex flex-col gap-3">
         <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col gap-3">
               <h3 className="text-base leading-5 font-medium tracking-[-1px]">{title}</h3>
               <p className="max-w-111.5 text-xs text-muted-foreground">{description}</p>
            </div>
            {hasItems && !isArranging && createAction}
         </div>
         {!hasItems ? (
            <div className="rounded-xl border py-5">{emptyState}</div>
         ) : (
            <>
               {alert}
               <div className="overflow-hidden rounded-lg border">
                  {isArranging ? (
                     <ArrangeList
                        items={items}
                        getId={getId}
                        renderItem={arrange.renderItem}
                        getHandleLabel={arrange.getHandleLabel}
                        hint={arrange.hint}
                        isSaving={arrange.isSaving}
                        // On failure stay in arrange mode so the user can retry.
                        onSave={(ids) =>
                           arrange.onSave(ids).then(
                              () => setIsArranging(false),
                              () => {}
                           )
                        }
                        onCancel={() => setIsArranging(false)}
                     />
                  ) : (
                     <>
                        <DataTable columns={columns} rows={items} getRowId={getId} emptyMessage="" />
                        <div className="flex justify-end border-t p-3">
                           <HintTooltip hint={arrange.disabledReason}>
                              <Button
                                 variant="outline"
                                 size="lg"
                                 disabled={items.length < MIN_ITEMS_TO_ARRANGE || Boolean(arrange.disabledReason)}
                                 onClick={() => setIsArranging(true)}
                              >
                                 <ArrowUpDownIcon />
                                 {arrange.buttonLabel}
                              </Button>
                           </HintTooltip>
                        </div>
                     </>
                  )}
               </div>
            </>
         )}
      </section>
   );
}
