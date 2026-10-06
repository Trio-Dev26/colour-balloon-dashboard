import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT_MS } from '@/constants/api';

// Shared HTTP client. Only services/ import it.
// No default Content-Type: axios sets JSON for plain objects itself and leaves FormData (file uploads) alone.
const axiosApi = axios.create({
   baseURL: API_BASE_URL,
   timeout: API_TIMEOUT_MS,
   withCredentials: true, // send the auth cookies the backend will set
});

// TODO(auth): when the backend access/refresh token endpoints are ready, add a response
// interceptor here that refreshes the token on 401 and redirects to /login if that fails.

export default axiosApi;
