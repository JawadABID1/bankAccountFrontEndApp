import { axiosInstance } from './axiosInstance';

// Fetch all bank accounts
export const fetchBankAccounts = async () => {
    const response = await axiosInstance.get('/ACCOUNT-SERVICE/accounts');
    return response.data;
};

// Fetch a single bank account by ID
export const fetchBankAccountById = async (id: string) => {
    const response = await axiosInstance.get(`/ACCOUNT-SERVICE/accounts/${id}`);
    return response.data;
};

// Create a new bank account
export const createBankAccount = async (data: any) => {
    const response = await axiosInstance.post('/ACCOUNT-SERVICE/accounts/create', data);
    return response.data;
};

// Update an existing bank account
export const updateBankAccount = async (id: string, data: any) => {
    console.log("++++++++++++data: ", JSON.stringify(data));
    const response = await axiosInstance.put(`/ACCOUNT-SERVICE/accounts/${id}`, data);
    return response.data;
};

// Delete a bank account
export const deleteBankAccount = async (id: string) => {
    const response = await axiosInstance.delete(`/bank-accounts/${id}`);
    return response.data;
};
