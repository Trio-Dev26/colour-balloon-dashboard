'use client';

import Link from 'next/link';
import { EyeIcon, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useModule } from '@/hooks/useModules';

// Header buttons on the module detail page. Same query as the page body (React Query shares
// the request), and hidden while loading or when the module doesn't exist.
export function ModuleDetailActions({ moduleId }: { moduleId: string }) {
   const { data: moduleDetail } = useModule(moduleId);
   if (!moduleDetail) return null;

   return (
      <>
         {/* TODO: link to the learner-view "Module overview" (FR-CUR-008) once that screen is designed. */}
         <Button variant="secondary" size="lg" className="font-semibold">
            <EyeIcon />
            Module overview
         </Button>
         <Button
            size="lg"
            className="font-semibold"
            nativeButton={false}
            render={<Link href={ROUTES.editModule(moduleId)} />}
         >
            <PencilIcon />
            Edit module info
         </Button>
      </>
   );
}
