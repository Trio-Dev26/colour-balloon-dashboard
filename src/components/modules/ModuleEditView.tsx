'use client';

import { ContentSkeleton } from '@/components/common/ContentSkeleton';
import { useModule } from '@/hooks/useModules';
import { moduleToFormValues } from '@/schemas/module.schema';
import { ModuleForm } from './ModuleForm';
import { ModuleNotFound } from './ModuleNotFound';

// Loads the module, then opens the shared form pre-filled with its values.
export function ModuleEditView({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail, isPending } = useModule(moduleId);

   if (isPending) return <ContentSkeleton />;
   if (!moduleDetail) return <ModuleNotFound />;

   return <ModuleForm title="Edit Module" defaultValues={moduleToFormValues(moduleDetail)} />;
}
