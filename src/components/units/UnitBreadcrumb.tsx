'use client';

import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb';
import { CURRICULUM_CODE_TONES } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useUnit } from '@/hooks/useUnits';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

// Unit › M001 Module title › U001 Unit title (› current, e.g. "Edit"). Shares the page's unit query.
export function UnitBreadcrumb({ unitId, current }: { unitId: string; current?: string }) {
   const { data: unit } = useUnit(unitId);

   const items: BreadcrumbEntry[] = [{ label: 'Unit', href: ROUTES.units }];
   if (unit) {
      items.push(
         {
            code: unit.module.code,
            codeTone: CURRICULUM_CODE_TONES.module,
            label: unit.module.titleEn,
            href: ROUTES.moduleDetail(unit.module.id),
         },
         {
            code: unit.code,
            codeTone: CURRICULUM_CODE_TONES.unit,
            label: unit.titleEn,
            href: current ? ROUTES.unitDetail(unitId) : undefined,
         }
      );
   }
   if (current) items.push({ label: current });

   return <PageBreadcrumb items={items} />;
}
