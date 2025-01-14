// bankAccount.d.ts
export interface BankAccount {
    id: string;
    accountNumber: string;
    accountType: string;
    balance: number;
    currency: string;
    customerId: string; // Assuming each account is linked to a customer
    createdAt: string;
    updatedAt: string;
}

export interface BankAccountCreateRequest {
    accountNumber: string;
    accountType: string;
    balance: number;
    currency: string;
    customerId: string;
}

export interface BankAccountUpdateRequest {
    accountNumber?: string;
    accountType?: string;
    balance?: number;
    currency?: string;
    customerId?: string;
}

export interface BankAccountResponse {
    data: BankAccount;
}

export interface BankAccountListResponse {
    data: BankAccount[];
}
