import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Removed BrowserRouter import
import HomePage from "../pages/HomePage.tsx";
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import CreateUserPage from '../pages/CreateUserPage';
import UserDetails from "../features/users/UserDetails.tsx";
import CustomersPage from '../pages/CustomersPage';
import CreateCustomerPage from '../pages/CreateCustomerPage';
import CustomerDetails from '../features/customers/CustomerDetails';
import BankAccountList from "../features/bankAccounts/BankAccountList.tsx";
import CreateAccountPage from '../pages/CreateAccountPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginForm from "../features/auth/LoginForm.tsx";
import RegisterForm from '../features/auth/RegisterForm';

// Import PrivateRoute for protected routes
import PrivateRoute from "../components/PrivateRoute.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />

            {/* Public routes (accessible without login) */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Private routes (accessible only if authenticated) */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
            <Route path="/create-user" element={<PrivateRoute><CreateUserPage /></PrivateRoute>} />
            <Route path="/users/:id" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
            <Route path="/customers" element={<PrivateRoute><CustomersPage /></PrivateRoute>} />
            <Route path="/create-customer" element={<PrivateRoute><CreateCustomerPage /></PrivateRoute>} />
            <Route path="/customers/:id" element={<PrivateRoute><CustomerDetails /></PrivateRoute>} />
            <Route path="/bank-accounts" element={<PrivateRoute><BankAccountList /></PrivateRoute>} />
            <Route path="/create-account" element={<PrivateRoute><CreateAccountPage /></PrivateRoute>} />

            {/* Catch-all for 404 pages */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
