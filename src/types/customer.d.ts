// customer.d.ts
export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface CustomerCreateRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export interface CustomerUpdateRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface CustomerResponse {
    data: Customer;
}

export interface CustomerListResponse {
    data: Customer[];
}
