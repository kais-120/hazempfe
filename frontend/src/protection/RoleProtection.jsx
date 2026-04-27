import React from 'react'
import Cookies from 'universal-cookie'
import { Navigate, Outlet } from 'react-router-dom';
import { useProfile } from '../utils/context/useProfile';
import LoadingScreen from '../components/pages/LoadingScreen';

const RoleProtection = ({ allowRole }) => {
  const { user, loading } = useProfile()

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!allowRole.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RoleProtection