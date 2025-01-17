import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {
    fetchCustomers,
    fetchCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from '../../api/customerApi';
import {CustomerState, RootState} from "../../types/redux";
import {Customer, CustomerCreateRequest, CustomerUpdateRequest} from "../../types/customer";

const initialState : CustomerState = {
    customers: [],
    selectedCustomer: null,
    status: 'idle',
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
    async (data: CustomerCreateRequest, { rejectWithValue }) => {
        try {
            return await createCustomer(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const modifyCustomer = createAsyncThunk(
    'customers/update',
    async ({ id, data }: { id: string; data: CustomerUpdateRequest }, { rejectWithValue }) => {
        console.log("modifyCustomerData and Id: " + JSON.stringify(data)+" and " + id);
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
            .addCase(getAllCustomers.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getCustomerById.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedCustomer = action.payload;
            })
            .addCase(getCustomerById.rejected, (state, action) => {
                state.status = "failed";
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

// // Selector to get all customers
// export const selectAllCustomer = (state: RootState) => state.customer.customers;
//
//
// // Memoized selector to get customer full name by Id
// export const getCustomerFullNameById = createSelector(
//     [selectAllCustomer, (_, id: string) => id],
//     (customers, id) => {
//         const customer = customers.find((customer) => customer.id === id);
//         return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
//     }
// );
//
//
//
// // Memoized selector for dropdown options (ID and FullName
// export const selectCustomerOptions = createSelector(
//     [selectAllCustomer], (customers)=>{
//         customers.map((customer)=>({
//             id: customer.id,
//             fullName: `${customer.firstName} ${customer.lastName}`
//         }))
//     }
// )

export default customerSlice.reducer;
