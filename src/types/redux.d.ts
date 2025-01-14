// import { RootState as AppRootState } from './store'; // Import RootState type from store.ts
//
// declare module 'react-redux' {
//     interface DefaultRootState extends AppRootState {}
// }

// redux.d.ts
import { Customer } from './customer.d'; // Import customer types
import { User } from './user.d'; // Import user types
import { BankAccount } from './bankAccount.d'; // Import bank account types

// Define the overall Redux state structure
export interface RootState {
    auth: AuthState;
    customer: CustomerState;
    user: UserState;
    bankAccount: BankAccountState;
}

// Authentication slice state
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

// Customer slice state
export interface CustomerState {
    customers: Customer[];
    loading: boolean;
    error: string | null;
}

// User slice state
export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

// Bank Account slice state
export interface BankAccountState {
    accounts: BankAccount[];
    loading: boolean;
    error: string | null;
}

// Actions types (for TypeScript safety)
export interface Action<T = string> {
    type: T;
    payload?: any;
}

// Example for Customer-related actions
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';

// Action creators for customers
export interface AddCustomerAction extends Action<typeof ADD_CUSTOMER> {
    payload: Customer;
}

export interface RemoveCustomerAction extends Action<typeof REMOVE_CUSTOMER> {
    payload: string; // Customer ID
}

export interface UpdateCustomerAction extends Action<typeof UPDATE_CUSTOMER> {
    payload: Customer;
}

// Combine all customer-related actions
export type CustomerActionTypes = AddCustomerAction | RemoveCustomerAction | UpdateCustomerAction;

// Similarly, you can define action types for Users and BankAccounts

