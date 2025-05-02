import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

export  function RoleProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (!token) {
      console.log("No token")
    return <Navigate to="/" replace />
  }

  try {
    const decoded = jwtDecode(token)
    console.log(decoded.role)
    console.log(requiredRole)
    if (decoded.role !== requiredRole) {
    //   console.log("No role")

        return <Navigate to="/" replace />
    }
    return children
  } catch (err) {
    console.error('Invalid token')
    console.log("error")
    return <Navigate to="/" replace />

  }
}