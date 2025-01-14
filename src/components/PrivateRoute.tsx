import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks'; // Assuming you are using Redux to manage the authentication state

const PrivateRoute: React.FC = () => {
    // Assuming you have an auth slice in your Redux state to check if the user is authenticated
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
