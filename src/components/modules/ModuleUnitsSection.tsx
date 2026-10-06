'use client';

import { useState } from 'react';
import { ArrowUpDownIcon, PlusIcon } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { InfoAlert } from '@/components/common/InfoAlert';
import { Button } from '@/components/ui/button';
import type { UnitSummary } from '@/types/api/module.types';
import { UnitArrangeList } from './UnitArrangeList';
import { getUnitColumns } from './unitColumns';

// TODO(api): wire delete to useDeleteUnit once the Unit API exists.
const columns = getUnitColumns(() => {});

const MIN_UNITS_TO_ARRANGE = 2;

export function ModuleUnitsSection({ moduleId, units }: { moduleId: string; units: UnitSummary[] }) {
   const [isArranging, setIsArranging] = useState(false);

   return (
      <section className="flex flex-col gap-3">
         <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col gap-3">
               <h3 className="text-base leading-5 font-medium tracking-[-1px]">Units</h3>
               <p className="max-w-111.5 text-xs text-muted-foreground">
                  The first lesson is automatically available. Each following lesson unlocks when the learner completes
                  the previous lesson.
               </p>
            </div>
            {/* TODO: open the Create Unit screen once it's designed. */}
            <Button size="lg" className="font-semibold" disabled={isArranging}>
               <PlusIcon />
               Create unit
            </Button>
         </div>
         <InfoAlert>
            The first unit is available automatically. Each next unit unlocks when the previous unit is completed.
         </InfoAlert>
         <div className="overflow-hidden rounded-lg border">
            {isArranging ? (
               <UnitArrangeList moduleId={moduleId} units={units} onDone={() => setIsArranging(false)} />
            ) : (
               <>
                  <DataTable columns={columns} rows={units} getRowId={(unit) => unit.id} emptyMessage="No units yet." />
                  <div className="flex justify-end border-t p-3">
                     <Button
                        variant="outline"
                        size="lg"
                        disabled={units.length < MIN_UNITS_TO_ARRANGE}
                        onClick={() => setIsArranging(true)}
                     >
                        <ArrowUpDownIcon />
                        Arrange units
                     </Button>
                  </div>
               </>
            )}
         </div>
      </section>
   );
}
