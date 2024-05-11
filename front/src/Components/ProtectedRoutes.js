import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ClientRoutes = () => {
    const location = useLocation()
    const user =  JSON.parse(localStorage.getItem("cafeteria_user")) 

  return (
    user?.role === "client"
        ? <Outlet />
        : <Navigate to="/login" state={{from: location}} replace />
  )
}

export const AdminRoutes = () => {
    const location = useLocation()
    const user =  JSON.parse(localStorage.getItem("cafeteria_user")) 

  return (
    user?.role === "admin"
        ? <Outlet />
        : <Navigate to="/login" state={{from: location}} replace />
  )
}