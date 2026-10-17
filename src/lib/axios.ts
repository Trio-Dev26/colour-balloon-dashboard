import axios, { HttpStatusCode, isAxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT_MS, AUTH_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/routes';

// Shared HTTP client. Only services/ import it.
// No default Content-Type: axios sets JSON for plain objects itself and leaves FormData (file uploads) alone.
const axiosApi = axios.create({
   baseURL: API_BASE_URL,
   timeout: API_TIMEOUT_MS,
   withCredentials: true, // send the auth cookies the backend sets
});

type RetryableConfig = InternalAxiosRequestConfig & { retried?: boolean };

const NO_REFRESH_URLS: string[] = [AUTH_PATHS.login, AUTH_PATHS.refresh];

// One refresh at a time: parallel 401s all wait on the same request.
let refreshing: Promise<unknown> | null = null;

const refreshSession = () => (refreshing ??= axiosApi.post(AUTH_PATHS.refresh).finally(() => (refreshing = null)));

const isUnauthorized = (error: unknown) =>
   isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;

// On 401: refresh the cookies once and retry. Only a rejected refresh ends the session;
// a network error or backend restart just fails the request instead of logging the admin out.
axiosApi.interceptors.response.use(undefined, async (error: unknown) => {
   const config = isAxiosError(error) ? (error.config as RetryableConfig | undefined) : undefined;
   if (!isUnauthorized(error) || !config || config.retried || NO_REFRESH_URLS.includes(config.url ?? '')) {
      throw error;
   }
   config.retried = true;
   try {
      await refreshSession();
   } catch (refreshError) {
      if (isUnauthorized(refreshError)) {
         window.location.assign(ROUTES.loginReturningTo(window.location.pathname + window.location.search));
      }
      throw error;
   }
   return axiosApi(config);
});

/** The record doesn't exist (404) or the id isn't a valid UUID (400). */
export const isMissingRecord = (error: unknown) => {
   const status = isAxiosError(error) ? error.response?.status : undefined;
   return status === HttpStatusCode.NotFound || status === HttpStatusCode.BadRequest;
};

export default axiosApi;
