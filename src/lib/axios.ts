import { ENV } from '@/config/env';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
   _retry?: boolean;
}

const axiosApi = axios.create({
   baseURL: ENV.BASE_API_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 60000,
   withCredentials: true,
});

axiosApi.interceptors.response.use(
   (response) => response,
   async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // Skip interceptor for authentication routes
      const isAuthRoute =
         originalRequest.url?.includes('/auth/login') ||
         originalRequest.url?.includes('/auth/refresh') ||
         originalRequest.url?.includes('/auth/forgot-password');

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthRoute) {
         originalRequest._retry = true;
         try {
            await axios.post(`${ENV.BASE_API_URL}auth/refresh`, {}, { withCredentials: true });
            return axiosApi(originalRequest);
         } catch (refreshError) {
            return Promise.reject(refreshError);
         }
      }
      return Promise.reject(error);
   }
);

export default axiosApi;
