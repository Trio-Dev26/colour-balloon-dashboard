import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/constants/api';
import { ROUTES } from '@/constants/routes';

// Blocks dashboard pages before they render when there's no session cookie, so they never flash.
// Only checks the cookie exists; the backend still verifies the token on every API call.
// (No redirect loop: the backend deletes the cookie when it rejects a refresh.)
export function proxy(request: NextRequest) {
   const { pathname, search } = request.nextUrl;
   const loggedIn = request.cookies.has(SESSION_COOKIE);
   const onLogin = pathname === ROUTES.login;

   if (onLogin && loggedIn) return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
   if (!onLogin && !loggedIn) {
      return NextResponse.redirect(new URL(ROUTES.loginReturningTo(pathname + search), request.url));
   }
   return NextResponse.next();
}

export const config = {
   // Every page except API calls, Next internals and static files.
   matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
