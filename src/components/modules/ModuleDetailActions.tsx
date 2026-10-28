'use client';

import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useModule } from '@/hooks/useModules';

// Header buttons on the module detail page. Same query as the page body (React Query shares
// the request), and hidden while loading or when the module doesn't exist.
// "Module overview" (learner preview, FR-CUR-008) is left out until that screen is designed.
export function ModuleDetailActions({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail } = useModule(moduleId);
   if (!moduleDetail) return null;

   return (
      <Button
         size="lg"
         className="font-semibold"
         nativeButton={false}
         render={<Link href={ROUTES.editModule(moduleId)} />}
      >
         <PencilIcon />
         Edit module info
      </Button>
   );
}
