import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CustomerState } from "../../types/customer";
import { Customer, CustomerCreateRequest, CustomerUpdateRequest } from "../../types/customer";
import { RootState } from "../store.ts";
import customerApi from "../../api/customerAPI.ts";

const initialState: CustomerState = {
    customers: [],
    selectedCustomer: null,
    status: 'idle',
    error: null,
};

// Helper for error handling
const handleError = (error: any) => error.response?.data || error.message || 'An unexpected error occurred.';

// Thunks
export const getAllCustomers = createAsyncThunk(
    'customers/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await customerApi.fetchCustomers();
        } catch (error: any) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const getCustomerById = createAsyncThunk(
    'customers/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await customerApi.fetchCustomerById(id);
        } catch (error: any) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const addCustomer = createAsyncThunk(
    'customers/create',
    async (data: CustomerCreateRequest, { rejectWithValue }) => {
        try {
            return await customerApi.createCustomer(data);
        } catch (error: any) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const modifyCustomer = createAsyncThunk(
    'customers/update',
    async ({ id, data }: { id: string; data: CustomerUpdateRequest }, { rejectWithValue }) => {
        try {
            return await customerApi.updateCustomer(id, data);
        } catch (error: any) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const removeCustomer = createAsyncThunk(
    'customers/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await customerApi.deleteCustomer(id);
            return id; // Return the ID for easy removal in the reducer
        } catch (error: any) {
            return rejectWithValue(handleError(error));
        }
    }
);

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload.data;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getCustomerById.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCustomer = action.payload.data;
            })
            .addCase(getCustomerById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload.data);
            })
            .addCase(modifyCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.map(customer =>
                    customer.id === action.payload.id ? action.payload : customer
                );
            })
            .addCase(removeCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(customer => customer.id !== action.payload);
            })
            .addCase(removeCustomer.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});


// Selectors
export const selectAllCustomers = (state: RootState) => state.customer.customers;

export const getCustomerFullNameById = createSelector(
    [selectAllCustomers, (_, id: string) => id],
    (customers, id) => {
        const customer = customers.find((customer: Customer) => customer.id === id);
        return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
    }
);

export const selectCustomerOptions = createSelector(
    [selectAllCustomers],
    (customers) =>
        customers.map((customer: Customer) => ({
            id: customer.id,
            fullName: `${customer.firstName} ${customer.lastName}`,
        }))
);

export default customerSlice.reducer;
