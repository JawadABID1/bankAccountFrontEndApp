import { axiosInstance } from './axiosInstance';
import {
    CustomerCreateRequest,
    CustomerUpdateRequest,
    CustomerResponse,
    CustomerListResponse,
    CustomerApi,
} from '../types/customer';
import { ApiResponse } from '../types/api';

// Implementing the CustomerApi interface
const customerApi: CustomerApi = {
    // Fetch all customers
    fetchCustomers: async (): Promise<ApiResponse<CustomerListResponse>> => {
        const response = await axiosInstance.get('/CUSTOMER-SERVICE/customers');
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Fetch a customer by ID
    fetchCustomerById: async (id: string): Promise<ApiResponse<CustomerResponse>> => {
        const response = await axiosInstance.get(`/CUSTOMER-SERVICE/customers/${id}`);
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Create a new customer
    createCustomer: async (data: CustomerCreateRequest): Promise<ApiResponse<CustomerResponse>> => {
        const response = await axiosInstance.post('/CUSTOMER-SERVICE/customers/create', data);
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 201 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Update an existing customer
    updateCustomer: async (id: string, data: CustomerUpdateRequest): Promise<ApiResponse<CustomerResponse>> => {
        const response = await axiosInstance.put(`/CUSTOMER-SERVICE/customers/${id}`, data);
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Delete a customer
    deleteCustomer: async (id: string): Promise<ApiResponse<null>> => {
        const response = await axiosInstance.delete(`/CUSTOMER-SERVICE/customers/${id}`);
        return {
            data: null,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    },
};

export default customerApi;
