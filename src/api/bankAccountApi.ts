import { axiosInstance } from './axiosInstance';

// Fetch all bank accounts
export const fetchBankAccounts = async () => {
    const response = await axiosInstance.get('/bank-accounts');
    return response.data;
};

// Fetch a single bank account by ID
export const fetchBankAccountById = async (id: string) => {
    const response = await axiosInstance.get(`/bank-accounts/${id}`);
    return response.data;
};

// Create a new bank account
export const createBankAccount = async (data: any) => {
    const response = await axiosInstance.post('/bank-accounts', data);
    return response.data;
};

// Update an existing bank account
export const updateBankAccount = async (id: string, data: any) => {
    const response = await axiosInstance.put(`/bank-accounts/${id}`, data);
    return response.data;
};

// Delete a bank account
export const deleteBankAccount = async (id: string) => {
    const response = await axiosInstance.delete(`/bank-accounts/${id}`);
    return response.data;
};
