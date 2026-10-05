import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
   _retry?: boolean;
}

// Same-origin: next.config.ts rewrites /api/* to the NestJS backend.
const axiosApi = axios.create({
   baseURL: '/api',
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 60000,
   withCredentials: true,
});

const AUTH_ROUTES = ['/auth/login', '/auth/refresh', '/auth/forgot-password'];

// One refresh shared by every request that got a 401 at the same time,
// so a rotated refresh token is never used twice.
let refreshPromise: Promise<unknown> | null = null;

axiosApi.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
      const isAuthRoute = AUTH_ROUTES.some((route) => originalRequest?.url?.startsWith(route));

      if (error.response?.status !== 401 || !originalRequest || originalRequest._retry || isAuthRoute) {
         return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
         refreshPromise ??= axiosApi.post('/auth/refresh').finally(() => {
            refreshPromise = null;
         });
         await refreshPromise;
         return axiosApi(originalRequest);
      } catch (refreshError) {
         if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            // Full reload on purpose: we are outside React here, and it clears the React Query cache.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.href = '/login';
         }
         return Promise.reject(refreshError);
      }
   }
);

export default axiosApi;
