'use client';

import { EditPageButton } from '@/components/common/EditPageButton';
import { ROUTES } from '@/constants/routes';
import { useModule } from '@/hooks/useModules';

// Header buttons on the module detail page. Same query as the page body (React Query shares
// the request), and hidden while loading or when the module doesn't exist.
// "Module overview" (learner preview, FR-CUR-008) is left out until that screen is designed.
export function ModuleDetailActions({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail } = useModule(moduleId);
   if (!moduleDetail) return null;

   return <EditPageButton href={ROUTES.editModule(moduleId)} label="Edit module info" />;
}
