import React from 'react'

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="spinner mb-4"></div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  )
}

export default LoadingSpinner
