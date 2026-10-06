'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { BilingualText } from '@/components/common/BilingualText';
import { SortableList } from '@/components/common/sortable/SortableList';
import { ToneBadge } from '@/components/common/ToneBadge';
import { Button } from '@/components/ui/button';
import { useReorderModuleUnits } from '@/hooks/useModules';
import type { UnitSummary } from '@/types/api/module.types';
import { UnitNumberBadge } from './UnitNumberBadge';

interface UnitArrangeListProps {
   moduleId: string;
   units: UnitSummary[];
   onDone: () => void;
}

const idsOf = (units: UnitSummary[]) => units.map((unit) => unit.id);

// "Arrange units" mode: drag rows into the new unlock order, then save or cancel.
export function UnitArrangeList({ moduleId, units, onDone }: UnitArrangeListProps) {
   const [ordered, setOrdered] = useState(units);
   const reorder = useReorderModuleUnits(moduleId);
   const hasChanges = idsOf(ordered).join() !== idsOf(units).join();

   const handleSave = () =>
      reorder.mutate(idsOf(ordered), {
         onSuccess: () => {
            toast.success('Unit order saved');
            onDone();
         },
      });

   return (
      <>
         <p className="border-b bg-muted px-3 py-2.5 text-xs text-muted-foreground">
            Drag units by the handle to change the order learners unlock them in. Unit 1 is always open first.
         </p>
         <SortableList
            items={ordered}
            getId={(unit) => unit.id}
            onReorder={setOrdered}
            getHandleLabel={(unit, index) => `Move unit ${index + 1}: ${unit.titleEn}`}
            renderItem={(unit, index) => (
               <>
                  <UnitNumberBadge order={index + 1} />
                  <BilingualText en={unit.titleEn} my={unit.titleMy} />
                  {index === 0 && <ToneBadge tone="primary">First unit</ToneBadge>}
                  <span className="ml-auto text-sm text-muted-foreground">{unit.code}</span>
               </>
            )}
         />
         <div className="flex justify-end gap-3 border-t p-3">
            <Button variant="secondary" size="lg" onClick={onDone} disabled={reorder.isPending}>
               Cancel
            </Button>
            <Button size="lg" onClick={handleSave} disabled={!hasChanges || reorder.isPending}>
               Save order
            </Button>
         </div>
      </>
   );
}
