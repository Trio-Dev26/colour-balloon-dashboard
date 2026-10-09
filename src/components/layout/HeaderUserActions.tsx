'use client';

import { BellIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout, useMe } from '@/hooks/useAuth';

export function HeaderUserActions() {
   const { data: me } = useMe();
   const logout = useLogout();

   return (
      <>
         <Button variant="ghost" size="icon" className="size-10 rounded-lg" aria-label="Notifications">
            <BellIcon className="size-5" />
         </Button>
         <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-full" aria-label="Account menu">
               <Avatar className="size-10">
                  <AvatarFallback>
                     {me ? me.email[0].toUpperCase() : <UserIcon className="size-5 text-muted-foreground" />}
                  </AvatarFallback>
                  <AvatarBadge className="bg-success-foreground" />
               </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
               <div className="truncate px-2 py-1.5 text-sm text-muted-foreground">{me?.email}</div>
               <DropdownMenuSeparator />
               <DropdownMenuItem className="cursor-pointer" disabled={logout.isPending} onClick={() => logout.mutate()}>
                  <LogOutIcon />
                  Log out
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
}
