import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, LogIn, AlertCircle } from 'lucide-react'
import { loginUser } from '../services/authService'
import { setAuth } from '../utils/auth'
import Toast from '../components/Toast'

const LoginPage = ({ setIsLoggedIn, setUser }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)
    try {
      const response = await loginUser(formData.email, formData.password)
      setAuth(response.token, response.user)
      setIsLoggedIn(true)
      setUser(response.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary to-primary p-8 text-center">
            <div className="text-5xl mb-3">🍛</div>
            <h1 className="text-3xl font-bold text-white">Hindustani Dhaba</h1>
            <p className="text-white text-opacity-90 mt-2">Admin Portal</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <Toast
                message={error}
                type="error"
                onClose={() => setError('')}
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@hindustanidhaba.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white py-3 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogIn size={20} />
                <span>{loading ? 'Logging in...' : 'Login'}</span>
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-800 mb-1">Email: admin@hindustanidhaba.com</p>
              <p className="text-xs text-blue-800">Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
