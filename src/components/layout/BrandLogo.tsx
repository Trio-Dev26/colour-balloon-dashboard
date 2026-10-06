import Link from 'next/link';
import { GraduationCapIcon } from 'lucide-react';
import { APP_NAME } from '@/constants/layout';
import { ROUTES } from '@/constants/routes';

export function BrandLogo() {
   return (
      <Link href={ROUTES.dashboard} className="flex items-center gap-2.5">
         <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCapIcon className="size-4" />
         </span>
         <span className="truncate text-xl font-bold text-foreground">{APP_NAME}</span>
      </Link>
   );
}
