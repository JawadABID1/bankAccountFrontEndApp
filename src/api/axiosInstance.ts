import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Replace with your API's base URL
    timeout: 10000, // Set a timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage or Redux
        const token = localStorage.getItem('authToken'); // Replace with your token management logic

        // If a token exists, attach it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add custom headers if needed
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle errors globally (e.g., logging out on 401)
        if (error.response?.status === 401) {
            // Optionally, redirect to the login page or clear session
            localStorage.removeItem('authToken');
            window.location.href = '/login'; // Replace with your login route
        }

        return Promise.reject(error);
    }
);

export { axiosInstance };
