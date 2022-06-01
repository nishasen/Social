import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams, Outlet } from 'react-router-dom';

const ProfileNavigate = () => {
    const { username } = useParams();
    const { allUser, token } = useSelector(state => state.auth);
    const userId = allUser?.find(user => user?.data?.username === username)?.userId;
    const location = useLocation();
    return userId!==token ? <Outlet /> : <Navigate state={{from: location}} to='/profile' replace />
}

export { ProfileNavigate };
