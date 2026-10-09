'use client';

import { useMe } from '@/hooks/useAuth';

/** Checks the session on every dashboard screen; lib/axios redirects to /login when it's gone. */
export function SessionGuard() {
   useMe();
   return null;
}
