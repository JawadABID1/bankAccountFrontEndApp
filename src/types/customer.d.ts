// Customer slice state
// import {ApiResponse} from "./api";


export interface CustomerState{
    customers: Customer[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    selectedCustomer: Customer | null;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface CustomerCreateRequest {
    firstName: string;
    lastName: string;
    email: string;
}

export interface CustomerUpdateRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface CustomerResponse {
    data: Customer;
}

export interface CustomerListResponse {
    data: Customer[];
}

export interface CustomerApi {
    fetchCustomers: () => Promise<ApiResponse<CustomerListResponse>>;  // Fetch all customers
    fetchCustomerById: (id: string) => Promise<ApiResponse<CustomerResponse>>;  // Get a single customer by ID
    createCustomer: (customer: CustomerCreateRequest) => Promise<ApiResponse<CustomerResponse>>;  // Create a new customer
    updateCustomer: (id: string, customer: CustomerUpdateRequest) => Promise<ApiResponse<CustomerResponse>>;  // Update an existing customer
    deleteCustomer: (id: string) => Promise<ApiResponse<null>>;  // Delete a customer
}
