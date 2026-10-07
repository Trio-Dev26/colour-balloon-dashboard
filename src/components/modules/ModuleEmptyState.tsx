import { EmptyIllustration } from '@/components/common/EmptyIllustration';
import { EmptyState } from '@/components/common/EmptyState';
import { CreateModuleButton } from './CreateModuleButton';

export function ModuleEmptyState() {
   return (
      <EmptyState
         icon={<EmptyIllustration />}
         title="No module yet!"
         description="It looks like you haven’t created any modules. Let’s build some amazing for your students."
         action={<CreateModuleButton />}
      />
   );
}
