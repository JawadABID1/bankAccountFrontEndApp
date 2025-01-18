import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { CustomerCreateRequest, CustomerState, CustomerUpdateRequest} from "../../types/customer";
import customerApi from "../../api/customerAPI.ts";

const initialState : CustomerState = {
    customers: [],
    selectedCustomer: null,
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

// Fetch all customers
export const getAllCustomers = createAsyncThunk(
    'customers/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await customerApi.fetchCustomers();
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Fetch a single customer by ID
export const getCustomerById = createAsyncThunk(
    'customers/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await customerApi.fetchCustomerById(id);
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Create a new customer
export const addCustomer = createAsyncThunk(
    'customers/create',
    async (data: CustomerCreateRequest, { rejectWithValue }) => {
        try {
            return await customerApi.createCustomer(data);
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Update an existing customer
export const modifyCustomer = createAsyncThunk(
    'customers/update',
    async (
        { id, data }: { id: string; data: CustomerUpdateRequest },
        { rejectWithValue }
    ) => {
        try {
            return await customerApi.updateCustomer(id, data);
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Delete a customer
export const removeCustomer = createAsyncThunk(
    'customers/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await customerApi.deleteCustomer(id);
            return id; // Return the ID of the deleted account
        } catch (error: unknown) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Slice
const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all customers
            .addCase(getAllCustomers.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload.data;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Fetch a single customer by ID
            .addCase(getCustomerById.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCustomer = action.payload.data;
            })
            .addCase(getCustomerById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Create a new customer
            .addCase(addCustomer.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers.push(action.payload.data);
            })
            .addCase(addCustomer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Update an existing customer
            .addCase(modifyCustomer.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(modifyCustomer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.customers.findIndex(
                    (account) => account.id === action.payload.id
                );
                if (index !== -1) {
                    state.customers[index] = action.payload.data;
                }
            })
            .addCase(modifyCustomer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            // Delete a customer
            .addCase(removeCustomer.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(removeCustomer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = state.customers.filter(
                    (customer) => customer.id !== action.payload
                );
            })
            .addCase(removeCustomer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

// export const selectAllCustomers = (state: RootState) => state.customer.customers;
//
// export const getCustomerFullNameById = createSelector(
//     [selectAllCustomers, (_, id: string) => id],
//     (customers, id) => {
//         const customer = customers.find((customer: Customer) => customer.id === id);
//         return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
//     }
// );

// export const selectCustomerOptions = createSelector(
//     [selectAllCustomers],
//     (customers) =>
//         customers.map((customer: Customer) => ({
//             id: customer.id,
//             fullName: `${customer.firstName} ${customer.lastName}`,
//         }))
// );

export default customerSlice.reducer;

