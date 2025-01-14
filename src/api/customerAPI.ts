import { axiosInstance } from './axiosInstance';

// Fetch all customers
export const fetchCustomers = async () => {
    const response = await axiosInstance.get('/customers');
    return response.data;
};

// Fetch a customer by ID
export const fetchCustomerById = async (id: string) => {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
};

// Create a new customer
export const createCustomer = async (data: any) => {
    const response = await axiosInstance.post('/customers', data);
    return response.data;
};

// Update an existing customer
export const updateCustomer = async (id: string, data: any) => {
    const response = await axiosInstance.put(`/customers/${id}`, data);
    return response.data;
};

// Delete a customer
export const deleteCustomer = async (id: string) => {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data;
};
