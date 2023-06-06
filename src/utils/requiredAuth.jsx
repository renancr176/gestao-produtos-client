import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom' 
import {AuthContext} from '../contexts/AuthContext';
import { verifyRoles } from './userRoles';

export default function RequiredAuth({requiredRoles}) {
    const location = useLocation();

    const {isAuthenticated, user, isLoading  } = useContext(AuthContext);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" state={{from: location}}/>
    }

    const userHasRequiredRole = verifyRoles(requiredRoles, user.roles);

    if (isAuthenticated && !userHasRequiredRole) {
        return <Navigate to="/AccessDenied" state={{from: location}}/>
    }

    return <Outlet />
}