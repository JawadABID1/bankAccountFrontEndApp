import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Removed BrowserRouter import
import HomePage from "../pages/HomePage.tsx";
import DashboardPage from '../pages/DashboardPage';
// import UsersPage from '../pages/UsersPage';
// import CreateUserPage from '../features/users/CreateUserPage.tsx';
// import UserDetails from "../features/users/UserDetails.tsx";
import CustomersPage from '../pages/customers/CustomersPage.tsx';
// import CreateCustomerPage from '../pages/customers/CreateCustomerPage.tsx';
import CustomerDetails from '../pages/customers/CustomerDetails';
// import BankAccountList from "../features/bankAccounts/BankAccountList.tsx";
// import CreateAccountPage from '../features/bankAccounts/CreateAccountPage.tsx';
import NotFoundPage from '../pages/NotFoundPage';
// import LoginForm from "../pages/auth/LoginForm.tsx";
// import RegisterForm from '../pages/auth/RegisterForm';

// Import PrivateRoute for protected routes
// import PrivateRoute from "../components/PrivateRoute.tsx";
import CustomerForm from "../pages/customers/CustomerForm.tsx";
import BankAccountDetails from "../pages/bankAccounts/BankAccountDetails.tsx";
import BankAccountForm from "../pages/bankAccounts/BankAccountForm.tsx";
import AccountsPage from "../pages/bankAccounts/AccountsPage.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />

            {/* Public routes (accessible without login) */}

            {/*Routing for auth*/}
            {/*<Route path="/login" element={<LoginForm />} />*/}
            {/*<Route path="/register" element={<RegisterForm />} />*/}

             {/*routing for customer*/}
             <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/customers/create" element={<CustomerForm />} />
            <Route path="/customers/edit/:id" element={<CustomerForm />} />

            {/*Routing for account*/}
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/accounts/:id" element={<BankAccountDetails />} />
            <Route path="/accounts/create" element={<BankAccountForm />} />
            <Route path="/accounts/edit/:id" element={<BankAccountForm />} />
            < Route path="/dashboard" element={<DashboardPage />}/>

            {/*/!* Private routes (accessible only if authenticated) *!/*/}
            {/*<Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />*/}
            {/*<Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />*/}
            {/*<Route path="/create-user" element={<PrivateRoute><CreateUserPage /></PrivateRoute>} />*/}
            {/*<Route path="/users/:id" element={<PrivateRoute><UserDetails /></PrivateRoute>} />*/}
            {/*<Route path="/customers" element={<PrivateRoute><CustomersPage /></PrivateRoute>} />*/}
            {/*<Route path="/create-customer" element={<PrivateRoute><CreateCustomerPage /></PrivateRoute>} />*/}
            {/*<Route path="/customers/:id" element={<PrivateRoute><CustomerDetails /></PrivateRoute>} />*/}
            {/*<Route path="/bank-accounts" element={<PrivateRoute><BankAccountList /></PrivateRoute>} />*/}
            {/*<Route path="/create-account" element={<PrivateRoute><CreateAccountPage /></PrivateRoute>} />*/}

            {/* Catch-all for 404 pages */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
