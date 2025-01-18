// Bank Account slice state
export interface BankAccountState {
    bankAccounts: BankAccount[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null ;
    selectedAccount:BankAccount | null;
}

export interface BankAccount {
    accountId: string;
    accountType: string;
    balance: number;
    currency: string;
    customerId: string; // Assuming each account is linked to a customer
    createDate: string;
    updatedDate: string;
    customer: {id: number; firstName: string; lastName: string; email: string};
}

export interface BankAccountCreateRequest {
    accountId: string;
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

// API Functions
export interface BankAccountApi {
    fetchBankAccounts: () => Promise<ApiResponse<BankAccountListResponse>>;  // Fetch all bank accounts
    fetchBankAccountById: (id: string) => Promise<ApiResponse<BankAccountResponse>>;  // Get a single bank account by ID
    createBankAccount: (account: BankAccountCreateRequest) => Promise<ApiResponse<BankAccountResponse>>;  // Create a new bank account
    updateBankAccount: (id: string, account: BankAccountUpdateRequest) => Promise<ApiResponse<BankAccountResponse>>;  // Update an existing bank account
    deleteBankAccount: (id: string) => Promise<ApiResponse<null>>;  // Delete a bank account
}
