import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchCustomers,
    fetchCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from '../../api/customerApi';

const initialState = {
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null,
};

// Thunks
export const getAllCustomers = createAsyncThunk(
    'customers/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchCustomers();
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCustomerById = createAsyncThunk(
    'customers/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await fetchCustomerById(id);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCustomer = createAsyncThunk(
    'customers/create',
    async (data: any, { rejectWithValue }) => {
        try {
            return await createCustomer(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const modifyCustomer = createAsyncThunk(
    'customers/update',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            return await updateCustomer(id, data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeCustomer = createAsyncThunk(
    'customers/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            return await deleteCustomer(id);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
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
                state.loading = true;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCustomerById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCustomer = action.payload;
            })
            .addCase(getCustomerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
            })
            .addCase(modifyCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex(customer => customer.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            .addCase(removeCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(customer => customer.id !== action.payload.id);
            });
    },
});

export default customerSlice.reducer;
