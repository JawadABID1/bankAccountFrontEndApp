import { axiosInstance } from './axiosInstance';
import {CustomerState} from "../types/redux";
import {CustomerCreateRequest, CustomerUpdateRequest} from "../types/customer";

// Fetch all customers
export const fetchCustomers = async () => {
    const response = await axiosInstance.get('/CUSTOMER-SERVICE/customers');
    console.log("response: ", response);
    return response.data;
};

// Fetch a customer by ID
export const fetchCustomerById = async (id: string) => {

    const response = await axiosInstance.get(`/CUSTOMER-SERVICE/customers/${id}`);
    return response.data;
};

// Create a new customer
export const createCustomer = async (data: CustomerCreateRequest) => {
    const response = await axiosInstance.post('/CUSTOMER-SERVICE/customers/create', data);
    return response.data;
};

// Update an existing customer
export const updateCustomer = async (id: string, data: CustomerUpdateRequest) => {

    console.log("data: " + data);
    const response = await axiosInstance.put(`/CUSTOMER-SERVICE/customers/${id}`, data);
    return response.data;
};

// Delete a customer
export const deleteCustomer = async (id: string) => {
    const response = await axiosInstance.delete(`/CUSTOMER-SERVICE/customers/${id}`);
    return response.data;
};
