// bankAccount.d.ts
export interface BankAccount {
    accountId: string;
    accountType: string;
    balance: number;
    currency: string;
    customerId: string; // Assuming each account is linked to a customer
    createDate: string;
    updatedDate: string;
}

export interface BankAccountCreateRequest {
    id: string;
    accountType: string;
    balance: number;
    currency: string;
    customerId: string;
}

export interface BankAccountUpdateRequest {
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
