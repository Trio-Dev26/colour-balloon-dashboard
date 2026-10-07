import { CreateButton } from '@/components/common/CreateButton';
import { ROUTES } from '@/constants/routes';

export function CreateModuleButton() {
   return <CreateButton label="Create module" href={ROUTES.newModule} />;
}
