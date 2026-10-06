import { BellIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// TODO(auth): show the signed-in admin's initials and a logout menu once GET /auth/me exists.
export function HeaderUserActions() {
   return (
      <>
         <Button variant="ghost" size="icon" className="size-10 rounded-lg" aria-label="Notifications">
            <BellIcon className="size-5" />
         </Button>
         <Avatar className="size-10">
            <AvatarFallback>
               <UserIcon className="size-5 text-muted-foreground" />
            </AvatarFallback>
            <AvatarBadge className="bg-success-foreground" />
         </Avatar>
      </>
   );
}
