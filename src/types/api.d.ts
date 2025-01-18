// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: string; // For example: 'admin', 'user'
//     createdAt: string;
//     updatedAt: string;
// }
//
// // Bank Account Type Definitions
// export interface BankAccount {
//     id: string;
//     userId: string;  // User ID associated with this bank account
//     accountNumber: string;
//     bankName: string;
//     balance: number;
//     createdAt: string;
//     updatedAt: string;
// }
//
// // Customer Type Definitions
// export interface Customer {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     createdAt: string;
//     updatedAt: string;
// }

// API Response Format (Success/Failure)
export interface ApiResponse<T> {
    data: T;  // The data returned from the API
    message: string;  // Message describing success or failure
    status: string;  // 'success' or 'error'
    code: number;  // HTTP status code
}

// // API Functions
// export interface BankAccountApi {
//     getAllAccounts: () => Promise<ApiResponse<BankAccount[]>>;  // Fetch all bank accounts
//     getAccountById: (id: string) => Promise<ApiResponse<BankAccount>>;  // Get a single bank account by ID
//     createAccount: (account: BankAccount) => Promise<ApiResponse<BankAccount>>;  // Create a new bank account
//     updateAccount: (id: string, account: BankAccount) => Promise<ApiResponse<BankAccount>>;  // Update an existing bank account
//     deleteAccount: (id: string) => Promise<ApiResponse<null>>;  // Delete a bank account
// }
//
// export interface UserApi {
//     getAllUsers: () => Promise<ApiResponse<User[]>>;  // Fetch all users
//     getUserById: (id: string) => Promise<ApiResponse<User>>;  // Get a single user by ID
//     createUser: (user: User) => Promise<ApiResponse<User>>;  // Create a new user
//     updateUser: (id: string, user: User) => Promise<ApiResponse<User>>;  // Update an existing user
//     deleteUser: (id: string) => Promise<ApiResponse<null>>;  // Delete a user
// }
//
// export interface CustomerApi {
//     fetchCustomers: () => Promise<ApiResponse<Customer[]>>;  // Fetch all customers
//     fetchCustomerById: (id: string) => Promise<ApiResponse<Customer>>;  // Get a single customer by ID
//     createCustomer: (customer: Customer) => Promise<ApiResponse<Customer>>;  // Create a new customer
//     updateCustomer: (id: string, customer: Customer) => Promise<ApiResponse<Customer>>;  // Update an existing customer
//     deleteCustomer: (id: string) => Promise<ApiResponse<null>>;  // Delete a customer
// }
//
// // Auth API (for login, logout, etc.)
// export interface AuthApi {
//     login: (email: string, password: string) => Promise<ApiResponse<User>>;  // Login a user
//     logout: () => Promise<ApiResponse<null>>;  // Logout the current user
//     register: (user: User) => Promise<ApiResponse<User>>;  // Register a new user
// }
