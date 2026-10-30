'use client';

import { DeleteEntityButton } from '@/components/common/DeleteEntityButton';
import { EditPageButton } from '@/components/common/EditPageButton';
import { moduleDeleteBlockedReason, moduleDeleteDescription } from '@/constants/module';
import { ROUTES } from '@/constants/routes';
import { useDeleteModule, useModule } from '@/hooks/useModules';
import { ModulePublishButton } from './ModulePublishButton';

// Header buttons on the module detail page. Same query as the page body (React Query shares
// the request), and hidden while loading or when the module doesn't exist.
// "Module overview" (learner preview, FR-CUR-008) is left out until that screen is designed.
export function ModuleDetailActions({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail } = useModule(moduleId);
   const { mutateAsync: deleteModule } = useDeleteModule();
   if (!moduleDetail) return null;

   return (
      <>
         <DeleteEntityButton
            entityName="module"
            name={`${moduleDetail.code} · ${moduleDetail.titleEn}`}
            description={moduleDeleteDescription(moduleDetail.unitCount, moduleDetail.lessonCount)}
            disabledReason={moduleDeleteBlockedReason(moduleDetail.status)}
            onDelete={() => deleteModule(moduleId)}
            redirectTo={ROUTES.modules}
         />
         <ModulePublishButton module={moduleDetail} />
         <EditPageButton href={ROUTES.editModule(moduleId)} label="Edit module info" />
      </>
   );
}
