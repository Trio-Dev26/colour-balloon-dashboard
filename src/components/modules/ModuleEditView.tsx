'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { useModule } from '@/hooks/useModules';
import { moduleToFormValues } from '@/schemas/module.schema';
import { ModuleForm } from './ModuleForm';
import { NotFoundState } from '@/components/common/NotFoundState';
import { ROUTES } from '@/constants/routes';

// Loads the module, then opens the shared form pre-filled with its values.
export function ModuleEditView({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail, isPending } = useModule(moduleId);

   if (isPending) return <ContentSkeleton />;
   if (!moduleDetail) return <NotFoundState entityName="module" backHref={ROUTES.modules} />;

   return <ModuleForm title="Edit Module" defaultValues={moduleToFormValues(moduleDetail)} />;
}
