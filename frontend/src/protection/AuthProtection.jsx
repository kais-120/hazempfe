import React from 'react'
import Cookies from 'universal-cookie'
import { Navigate, Outlet } from 'react-router-dom';

const AuthProtection = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth")
  return (
    token ? <Navigate to={"/"} replace={true} />
    : <Outlet />
  )
}

export default AuthProtection