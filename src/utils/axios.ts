// axiosInstance.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Create an Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: apiUrl
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom headers or modify the request here
    // Example: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Process the response data here if needed
    return response;
  },
  (error) => {
    // Handle response errors, e.g., logging out the user on 401
    if (error.response && error.response.status === 401) {
      // Example: redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
