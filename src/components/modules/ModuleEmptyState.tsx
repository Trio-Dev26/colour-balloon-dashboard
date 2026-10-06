import Image from 'next/image';
import { EmptyState } from '@/components/common/EmptyState';
import { CreateModuleButton } from './CreateModuleButton';

export function ModuleEmptyState() {
   return (
      <EmptyState
         icon={
            <Image src="/images/empty-module.png" alt="" width={120} height={80} className="h-20 w-30 object-contain" />
         }
         title="No module yet!"
         description="It looks like you haven’t created any modules. Let’s build some amazing for your students."
         action={<CreateModuleButton />}
      />
   );
}
