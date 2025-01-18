import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {BankAccountCreateRequest, BankAccountState, BankAccountUpdateRequest} from "../../types/bankAccount";
import bankAccountApi from "../../api/bankAccountApi.ts";

const initialState : BankAccountState = {
    bankAccounts: [],
    selectedAccount: null,
    status: 'idle',
    error: null,
};
// Helper for error handling
const handleError = (error: unknown): string => {
    if (error instanceof Error) {
        // Handle standard Error objects
        return error.message;
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
        // Check if the error has a 'response' property
        const responseError = error as { response: { data: string } };
        return responseError.response.data;
    } else {
        return 'An unexpected error occurred.';
    }
};


// Thunks

// Fetch all bank accounts
export const getAllBankAccounts = createAsyncThunk(
    'bankAccounts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await bankAccountApi.fetchBankAccounts();
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Fetch a single bank account by ID
export const getBankAccountById = createAsyncThunk(
    'bankAccounts/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await bankAccountApi.fetchBankAccountById(id);
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Create a new bank account
export const createNewBankAccount = createAsyncThunk(
    'bankAccounts/create',
    async (data: BankAccountCreateRequest, { rejectWithValue }) => {
        try {
            return await bankAccountApi.createBankAccount(data);
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Update an existing bank account
export const updateExistingBankAccount = createAsyncThunk(
    'bankAccounts/update',
    async (
        { id, data }: { id: string; data: BankAccountUpdateRequest },
        { rejectWithValue }
    ) => {
        try {
            return await bankAccountApi.updateBankAccount(id, data);
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Delete a bank account
export const deleteBankAccount= createAsyncThunk(
    'bankAccounts/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await bankAccountApi.deleteBankAccount(id);
            return id; // Return the ID of the deleted account
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Slice
const bankAccountSlice = createSlice({
    name: 'bankAccounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all bank accounts
            .addCase(getAllBankAccounts.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getAllBankAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bankAccounts = action.payload.data;
            })
            .addCase(getAllBankAccounts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Fetch a single bank account by ID
            .addCase(getBankAccountById.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getBankAccountById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedAccount = action.payload.data;
            })
            .addCase(getBankAccountById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Create a new bank account
            .addCase(createNewBankAccount.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(createNewBankAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bankAccounts.push(action.payload.data);
            })
            .addCase(createNewBankAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Update an existing bank account
            .addCase(updateExistingBankAccount.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(updateExistingBankAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.bankAccounts.findIndex(
                    (account) => account.accountId === action.payload.id
                );
                if (index !== -1) {
                    state.bankAccounts[index] = action.payload.data;
                }
            })
            .addCase(updateExistingBankAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Delete a bank account
            .addCase(deleteBankAccount.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(deleteBankAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bankAccounts = state.bankAccounts.filter(
                    (account) => account.accountId !== action.payload
                );
            })
            .addCase(deleteBankAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});


export default bankAccountSlice.reducer;
