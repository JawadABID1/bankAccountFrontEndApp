import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../../api/userApi';

const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
};

// Thunks
export const getAllUsers = createAsyncThunk(
    'users/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchUsers();
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserById = createAsyncThunk(
    'users/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await fetchUserById(id);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addUser = createAsyncThunk(
    'users/create',
    async (data: any, { rejectWithValue }) => {
        try {
            return await createUser(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const setUser = createAsyncThunk(
    'users/update',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            return await updateUser(id, data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeUser = createAsyncThunk(
    'users/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            return await deleteUser(id);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(setUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload.id);
            });
    },
});

export default userSlice.reducer;
