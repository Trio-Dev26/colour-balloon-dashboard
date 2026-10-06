import { Fragment } from 'react';
import { MetaChip } from '@/components/common/MetaChip';
import { Separator } from '@/components/ui/separator';
import { EMPTY_VALUE } from '@/constants/common';
import type { Tone } from '@/types/ui/common.types';
import type { ModuleDetail } from '@/types/api/module.types';

// LEVEL / CATEGORY / MODULE CODE pills across the top of the detail page.
export function ModuleMetaBar({ module }: { module?: ModuleDetail }) {
   const items: { label: string; value?: string; tone: Tone }[] = [
      { label: 'Level', value: module?.level.titleEn, tone: 'success' },
      { label: 'Category', value: module?.category.titleEn, tone: 'info' },
      { label: 'Module code', value: module?.code, tone: 'warning' },
   ];

   return (
      <div className="flex flex-wrap items-center gap-6 py-0.5">
         {items.map((item, index) => (
            <Fragment key={item.label}>
               {index > 0 && <Separator orientation="vertical" className="h-7" />}
               <MetaChip label={item.label} value={item.value ?? EMPTY_VALUE} tone={item.tone} />
            </Fragment>
         ))}
      </div>
   );
}
