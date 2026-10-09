import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LOGIN_NEXT_PARAM, ROUTES } from '@/constants/routes';
import { getMe, login, logout } from '@/services/auth.service';
import type { LoginRequest } from '@/types/api/auth.types';
import { authKeys } from './queryKeys';

/** The signed-in admin. A 401 here makes lib/axios refresh or send the user to /login. */
export function useMe() {
   return useQuery({ queryKey: authKeys.me(), queryFn: getMe, retry: false });
}

/** `?next=` from the URL, only if it stays on this site (rejects '//evil.com', '/\evil.com', 'https://…'). */
function nextPath(): string {
   const next = new URLSearchParams(window.location.search).get(LOGIN_NEXT_PARAM);
   if (!next) return ROUTES.dashboard;
   const url = new URL(next, window.location.origin);
   return url.origin === window.location.origin ? url.pathname + url.search : ROUTES.dashboard;
}

export function useLogin() {
   const router = useRouter();
   return useMutation({
      mutationFn: (body: LoginRequest) => login(body),
      onSuccess: () => router.replace(nextPath()),
   });
}

export function useLogout() {
   return useMutation({
      mutationFn: logout,
      // Full page load, not router.replace: it wipes Next's router cache and React Query,
      // so Back can't show a cached dashboard screen.
      onSuccess: () => window.location.replace(ROUTES.login),
      // Cookies are still set, so staying put is honest; the user can retry.
      onError: () => toast.error('Couldn’t log out. Please try again.'),
   });
}
