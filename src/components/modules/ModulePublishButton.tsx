'use client';

import { EyeOffIcon, SendIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/button';
import { modulePublishBlockedReason, modulePublishDescription } from '@/constants/module';
import { useUpdateModuleStatus } from '@/hooks/useModules';
import { apiErrorMessage } from '@/lib/form';
import type { ModuleDetail } from '@/types/api/module.types';

// Publish / Unpublish on the module detail page (D17). Always asks first: going live is a serious action.
// Disabled, with the reason on hover, until the module has a unit with a lesson.
export function ModulePublishButton({ module }: { module: ModuleDetail }) {
   const { mutate: updateStatus, isPending } = useUpdateModuleStatus();
   const isPublished = module.status === 'PUBLISHED';
   const blockedReason = modulePublishBlockedReason(module);
   const verb = isPublished ? 'Unpublish' : 'Publish';

   const button = (
      <Button variant="secondary" size="lg" className="font-semibold" disabled={Boolean(blockedReason) || isPending}>
         {isPublished ? <EyeOffIcon /> : <SendIcon />}
         {verb} module
      </Button>
   );

   if (blockedReason) return <HintTooltip hint={blockedReason}>{button}</HintTooltip>;

   const confirm = () =>
      updateStatus(
         { id: module.id, status: isPublished ? 'UNPUBLISHED' : 'PUBLISHED' },
         {
            onSuccess: () => toast.success(`${module.code} ${isPublished ? 'unpublished' : 'published'}`),
            onError: (error) => toast.error(apiErrorMessage(error, `Couldn’t ${verb.toLowerCase()} ${module.code}.`)),
         }
      );

   return (
      <ConfirmDialog
         trigger={button}
         title={`${verb} ${module.code} · ${module.titleEn}?`}
         description={modulePublishDescription(module)}
         confirmLabel={`${verb} module`}
         onConfirm={confirm}
         destructive={isPublished}
      />
   );
}
