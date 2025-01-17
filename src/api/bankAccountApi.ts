import { axiosInstance } from './axiosInstance';
import {
    BankAccountApi,
    BankAccountCreateRequest,
    BankAccountListResponse,
    BankAccountResponse, BankAccountUpdateRequest
} from "../types/bankAccount";
import {ApiResponse} from "../types/api";


const bankAccountApi: BankAccountApi = {
    // Fetch all bank accounts
    fetchBankAccounts: async (): Promise<ApiResponse<BankAccountListResponse>> => {
        const response = await axiosInstance.get('/ACCOUNT-SERVICE/accounts');
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Fetch a single bank account by ID
    fetchBankAccountById: async (id: string): Promise<ApiResponse<BankAccountResponse>> => {
        const response = await axiosInstance.get(`/ACCOUNT-SERVICE/accounts/${id}`);
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Create a new bank account
    createBankAccount: async (data: BankAccountCreateRequest): Promise<ApiResponse<BankAccountResponse>> =>{
        const response = await axiosInstance.post('/ACCOUNT-SERVICE/accounts/create', data);
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 201 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Update an existing bank account
    updateBankAccount: async (id: string, data: BankAccountUpdateRequest): Promise<ApiResponse<BankAccountResponse>> =>{
        const response = await axiosInstance.put(`/ACCOUNT-SERVICE/accounts/${id}`, data);
        return {
            data: response.data,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    },

    // Delete a bank account
    deleteBankAccount : async (id: string):Promise<ApiResponse<null>> => {
        const response = await axiosInstance.delete(`/ACCOUNT-SERVICE/accounts/${id}`);
        return {
            data: null,
            message: response.statusText,
            status: response.status === 200 ? 'success' : 'error',
            code: response.status,
        };
    }
}

export default bankAccountApi;
