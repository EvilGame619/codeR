import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true // this sends the refreshToken cookie automatically
});

// Request interceptor - attach access token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor - handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If 401 error and not already trying to refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the /auth/refresh endpoint
        const res = await api.get('/auth/refresh');

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('token', newAccessToken);

        // Update Authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh Token expired or invalid", refreshError);
        // Optional: redirect to login or show message
        window.location.href = "/auth/login"
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
