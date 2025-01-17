import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchBankAccounts,
    fetchBankAccountById,
    createBankAccount,
    updateBankAccount,
    deleteBankAccount as deleteBankAccountApi,
} from '../../api/bankAccountApi';
import {BankAccountState} from "../../types/redux";

const initialState : BankAccountState = {
    bankAccounts: [],
    selectedAccount: null,
    status: 'idle',
    error: null,
};

// Thunks

// Fetch all bank accounts
export const getAllBankAccounts = createAsyncThunk(
    'bankAccounts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchBankAccounts();
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching bank accounts');
        }
    }
);

// Fetch a single bank account by ID
export const getBankAccountById = createAsyncThunk(
    'bankAccounts/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await fetchBankAccountById(id);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error fetching bank account by ID');
        }
    }
);

// Create a new bank account
export const createNewBankAccount = createAsyncThunk(
    'bankAccounts/create',
    async (accountData: { name: string; balance: number }, { rejectWithValue }) => {
        try {
            return await createBankAccount(accountData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error creating bank account');
        }
    }
);

// Update an existing bank account
export const updateExistingBankAccount = createAsyncThunk(
    'bankAccounts/update',
    async (
        { id, data }: { id: string; data: { balance: number, currency: string, accountType: string, customerId: number } },
        { rejectWithValue }
    ) => {
        try {
            return await updateBankAccount(id, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error updating bank account');
        }
    }
);

// Delete a bank account
export const deleteBankAccount = createAsyncThunk(
    'bankAccounts/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteBankAccountApi(id);
            return id; // Return the ID of the deleted account
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error deleting bank account');
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
                state.bankAccounts = action.payload;
            })
            .addCase(getAllBankAccounts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch a single bank account by ID
            .addCase(getBankAccountById.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getBankAccountById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedAccount = action.payload;
            })
            .addCase(getBankAccountById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Create a new bank account
            .addCase(createNewBankAccount.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(createNewBankAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bankAccounts.push(action.payload);
            })
            .addCase(createNewBankAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update an existing bank account
            .addCase(updateExistingBankAccount.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(updateExistingBankAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.bankAccounts.findIndex(
                    (account) => account.id === action.payload.id
                );
                if (index !== -1) {
                    state.bankAccounts[index] = action.payload;
                }
            })
            .addCase(updateExistingBankAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete a bank account
            .addCase(deleteBankAccount.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(deleteBankAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bankAccounts = state.bankAccounts.filter(
                    (account) => account.id !== action.payload
                );
            })
            .addCase(deleteBankAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default bankAccountSlice.reducer;
