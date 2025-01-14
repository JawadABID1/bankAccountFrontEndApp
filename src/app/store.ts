import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import bankAccountReducer from './slices/bankAccountSlice';
import customerReducer from './slices/customerSlice'; // If you have a customer slice
// import { RootState } from './redux.d'; // You may need to define this type

// Create the store and add reducers
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        bankAccount: bankAccountReducer,
        customer: customerReducer, // Add the customer reducer if applicable
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

// Export the types for `useSelector` and `useDispatch` hooks to use with typed state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Export the store
export default store;
