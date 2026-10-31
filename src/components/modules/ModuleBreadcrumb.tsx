'use client';

import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb';
import { CURRICULUM_CODE_TONES } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useModule } from '@/hooks/useModules';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

// Module › M001 Title (› current, e.g. "Edit"). Shares the page's module query.
export function ModuleBreadcrumb({ moduleId, current }: { moduleId: string; current?: string }) {
   const { data: moduleDetail } = useModule(moduleId);

   const items: BreadcrumbEntry[] = [{ label: 'Module', href: ROUTES.modules }];
   if (moduleDetail) {
      items.push({
         code: moduleDetail.code,
         codeTone: CURRICULUM_CODE_TONES.module,
         label: moduleDetail.titleEn,
         href: current ? ROUTES.moduleDetail(moduleId) : undefined,
      });
   }
   if (current) items.push({ label: current });

   return <PageBreadcrumb items={items} />;
}
