import { FolderOpenIcon } from 'lucide-react';
import { CreateButton } from '@/components/common/CreateButton';
import { IconTile } from '@/components/common/IconTile';
import { SectionCard } from '@/components/common/SectionCard';
import { RECENT_MODULES_LIMIT } from '@/constants/dashboard';
import { ROUTES } from '@/constants/routes';
import type { ModuleListItem } from '@/types/api/module.types';
import { RecentModuleRow } from './RecentModuleRow';
import { ViewAllLink } from './ViewAllLink';

// The modules edited most recently, so admins can jump back into their work.
export function RecentModulesCard({ modules }: { modules: ModuleListItem[] }) {
   return (
      <SectionCard
         title="Recently updated modules"
         description="Pick up where you left off."
         action={<ViewAllLink href={ROUTES.modules} />}
         className="lg:col-span-2"
      >
         {modules.length > 0 ? (
            <ul className="-mx-2 flex flex-col">
               {modules.slice(0, RECENT_MODULES_LIMIT).map((module) => (
                  <RecentModuleRow key={module.id} module={module} />
               ))}
            </ul>
         ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
               <IconTile icon={FolderOpenIcon} />
               <p className="text-sm text-muted-foreground">No modules yet. Create the first one to get started.</p>
               <CreateButton label="Create module" href={ROUTES.newModule} />
            </div>
         )}
      </SectionCard>
   );
}
