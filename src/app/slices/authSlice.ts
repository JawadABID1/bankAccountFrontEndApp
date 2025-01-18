// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { userLogin, userLogout, getUserProfile, register } from '../../api/authApi'; // Import your register API function
// import { RootState } from '../store';
//
// interface AuthState {
//     isAuthenticated: boolean;
//     user: any | null;
//     token: string | null;
//     loading: boolean;
//     error: string | null;
// }
//
// // Initial state for auth
// const initialState: AuthState = {
//     isAuthenticated: true,
//     user: null,
//     token: localStorage.getItem('token') || null, // Persist token in localStorage
//     loading: false,
//     error: null,
// };
//
// // Thunks
// export const login = createAsyncThunk(
//     'auth/login',
//     async (credentials: { username: string; password: string }, { rejectWithValue }) => {
//         try {
//             const response = await userLogin(credentials); // You can call your API here
//             localStorage.setItem('token', response.token); // Store token in localStorage
//             return response; // Assuming API returns user info and token
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data || 'Login failed');
//         }
//     }
// );
//
// export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
//     try {
//         await userLogout(); // You can add a logout API call if necessary
//         localStorage.removeItem('token');
//     } catch (error: any) {
//         return rejectWithValue(error.response?.data || 'Logout failed');
//     }
// });
//
// export const fetchUserProfile = createAsyncThunk(
//     'auth/fetchUserProfile',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await getUserProfile(); // Call the API to fetch user profile
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data || 'Failed to fetch profile');
//         }
//     }
// );
//
// // Register async thunk
// export const registerUser = createAsyncThunk(
//     'auth/register',
//     async (userData: { username: string; password: string; email: string }, { rejectWithValue }) => {
//         try {
//             const response = await register(userData); // Call the register API
//             return response; // Assuming it returns user info and token
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data || 'Registration failed');
//         }
//     }
// );
//
// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(login.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.isAuthenticated = true;
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(logout.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(logout.fulfilled, (state) => {
//                 state.loading = false;
//                 state.isAuthenticated = false;
//                 state.user = null;
//                 state.token = null;
//             })
//             .addCase(logout.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(fetchUserProfile.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchUserProfile.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//             })
//             .addCase(fetchUserProfile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             // Handle register action
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.isAuthenticated = true;
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });
//
// export const selectAuth = (state: RootState) => state.auth;
//
// export default authSlice.reducer;
