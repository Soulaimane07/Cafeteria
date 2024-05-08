import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectedRoutes() {
    const location = useLocation()
    const user =  JSON.parse(localStorage.getItem("cafeteria_user")) 


  return (
    user
        ? <Outlet />
        : <Navigate to="/login" state={{from: location}} replace />

  )
}

export default ProtectedRoutes