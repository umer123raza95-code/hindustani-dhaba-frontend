import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import LoadingSpinner from './components/LoadingSpinner'
import { getToken, getUser } from './utils/auth'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = getToken()
    const userData = getUser()

    if (token && userData) {
      setIsLoggedIn(true)
      setUser(userData)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingSpinner message="Initializing Admin Dashboard..." />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home to dashboard or login */}
        <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />

        {/* Login route */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            )
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
