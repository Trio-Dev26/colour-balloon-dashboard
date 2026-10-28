'use client';

import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb';
import { CURRICULUM_CODE_TONES } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useModule } from '@/hooks/useModules';
import type { BreadcrumbEntry } from '@/types/ui/navigation.types';

// Module › M001 Title. Shares the page's module query.
export function ModuleBreadcrumb({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail } = useModule(moduleId);

   const items: BreadcrumbEntry[] = [{ label: 'Module', href: ROUTES.modules }];
   if (moduleDetail)
      items.push({ code: moduleDetail.code, codeTone: CURRICULUM_CODE_TONES.module, label: moduleDetail.titleEn });

   return <PageBreadcrumb items={items} />;
}
