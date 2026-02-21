import React from 'react'
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'

const Toast = ({ message, type = 'info', onClose }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  }

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-yellow-800',
  }

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertCircle size={20} />,
  }

  return (
    <div className={`border ${bgColor[type]} rounded-lg p-4 flex items-center justify-between gap-4 slide-in-up`}>
      <div className={`flex items-center gap-3 ${textColor[type]}`}>
        {icons[type]}
        <p className="font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className={`p-1 hover:bg-gray-200 rounded-lg transition-colors duration-200`}
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Toast
