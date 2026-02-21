import React from 'react'
import { Edit2, Trash2, DollarSign, Utensils } from 'lucide-react'

const MenuItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image Container (responsive heights) */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-48 bg-gray-200 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            <Utensils size={48} className="text-white opacity-50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">{item.description}</p>

        {/* Category */}
        {item.category && (
          <div className="mb-3">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
            <DollarSign size={20} className="text-accent" />
            <span className="text-xl md:text-2xl font-bold text-accent">₹{item.price}</span>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              item.isAvailable
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {item.isAvailable ? '✓ Available' : '✗ Not Available'}
          </span>
        </div>

        {/* Actions: stack on small screens, inline on sm+ */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onEdit(item)}
            className="w-full sm:flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-orange-400 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            <Edit2 size={18} />
            <span className="inline">Edit</span>
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="w-full sm:flex-1 flex items-center justify-center space-x-2 bg-accent hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            <Trash2 size={18} />
            <span className="inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard
