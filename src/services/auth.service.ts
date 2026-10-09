// Admin auth. Tokens live in httpOnly cookies set by the backend; JS never sees them.
import axiosApi from '@/lib/axios';
import { AUTH_PATHS } from '@/constants/api';
import type { AuthUser, LoginRequest, SessionUser } from '@/types/api/auth.types';

export async function login(body: LoginRequest): Promise<AuthUser> {
   return (await axiosApi.post<{ user: AuthUser }>(AUTH_PATHS.login, body)).data.user;
}

export async function logout(): Promise<void> {
   await axiosApi.post(AUTH_PATHS.logout);
}

export async function getMe(): Promise<SessionUser> {
   return (await axiosApi.get<SessionUser>(AUTH_PATHS.me)).data;
}
