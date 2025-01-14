// Import the axiosInstance for making API requests
import { axiosInstance } from './axiosInstance.ts';

// API URL for auth-related endpoints (login, register, etc.)
const AUTH_URL = '/auth'; // The `/auth` part depends on your backend routes

// API request to log in
export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post(`${AUTH_URL}/login`, {
            email,
            password,
        });
        const { token } = response.data; // Assuming the response contains a token
        if (token) {
            localStorage.setItem('authToken', token); // Store the token in local storage
        }
        return response.data; // Return the full response data
    } catch (error) {
        throw new Error('Login failed');
    }
};

// API request to register a new user
export const register = async (email: string, password: string, name: string) => {
    try {
        const response = await axiosInstance.post(`${AUTH_URL}/register`, {
            email,
            password,
            name,
        });
        return response.data; // Assuming the response contains user data
    } catch (error) {
        throw new Error('Registration failed');
    }
};

// API request to log out
export const logout = () => {
    localStorage.removeItem('authToken'); // Remove the token from local storage
};

// API request to get user profile (protected route)
export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get(`${AUTH_URL}/profile`);
        return response.data; // Assuming the response contains user profile data
    } catch (error) {
        throw new Error('Failed to fetch user profile');
    }
};

// Custom functions for user login and logout
export const userLogin = async (email: string, password: string) => {
    try {
        const userData = await login(email, password);
        console.log('User logged in:', userData); // Optional logging for debugging
        return userData; // Return user data on successful login
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
};

export const userLogout = () => {
    logout();
    console.log('User logged out'); // Optional logging for debugging
};
