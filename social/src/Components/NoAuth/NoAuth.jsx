import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const NoAuth = () => {
    const { userLogin } = useSelector(state => state.auth);
    const location = useLocation();
    return !userLogin ? <Outlet /> : <Navigate state={{from: location}} to='/home' replace />
}

export { NoAuth };
