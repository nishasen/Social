import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const { userLogin } = useSelector(state => state.auth);
    const location = useLocation();
    return userLogin ? <Outlet /> : <Navigate state={{from: location}} to='/' replace />
}

export { RequireAuth };
