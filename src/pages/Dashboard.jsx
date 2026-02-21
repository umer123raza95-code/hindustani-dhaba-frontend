import React, { useState, useEffect } from 'react'
import { Plus, Search, AlertCircle, Loader } from 'lucide-react'
import Navbar from '../components/Navbar'
import MenuItemCard from '../components/MenuItemCard'
import MenuItemForm from '../components/MenuItemForm'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../services/menuService'

const Dashboard = ({ user, setIsLoggedIn, setUser }) => {
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [toast, setToast] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = ['All', 'Starter', 'Main Course', 'Sweets', 'Drinks', 'Desserts', 'Beverages']

  // Load menu items
  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    setLoading(true)
    try {
      const data = await getMenuItems()
      setMenuItems(data.data || data)
      filterItems(data.data || data, searchTerm, categoryFilter)
    } catch (err) {
      showToast('Failed to load menu items', 'error')
    } finally {
      setLoading(false)
    }
  }

  const filterItems = (items, search, category) => {
    let filtered = items

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== 'All') {
      filtered = filtered.filter((item) => item.category === category)
    }

    setFilteredItems(filtered)
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    filterItems(menuItems, value, categoryFilter)
  }

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category)
    filterItems(menuItems, searchTerm, category)
  }

  const handleAddClick = () => {
    setSelectedItem(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMenuItem(id)
        setMenuItems(menuItems.filter((item) => item._id !== id))
        filterItems(
          menuItems.filter((item) => item._id !== id),
          searchTerm,
          categoryFilter
        )
        showToast('Item deleted successfully', 'success')
      } catch (err) {
        showToast('Failed to delete item', 'error')
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (selectedItem) {
        const updated = await updateMenuItem(selectedItem._id, formData)
        setMenuItems(menuItems.map((item) => (item._id === selectedItem._id ? updated : item)))
        showToast('Item updated successfully', 'success')
      } else {
        const newItem = await addMenuItem(formData)
        setMenuItems([...menuItems, newItem])
        showToast('Item added successfully', 'success')
      }
      loadMenuItems()
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error')
    }
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onLogout={() => setIsLoggedIn(false)}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast Notification */}
        {toast && (
          <div className="mb-6">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Menu Management</h2>
            <p className="text-gray-600 mt-1">Manage your restaurant's menu items</p>
          </div>
          <button
            onClick={handleAddClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary hover:bg-orange-400 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add New Dish</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search dishes by name or description..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                    categoryFilter === cat
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Count */}
            <div className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredItems.length}</span> of{' '}
              <span className="font-bold text-gray-900">{menuItems.length}</span> dishes
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader className="animate-spin text-primary mb-4" size={48} />
            <p className="text-gray-600 font-medium">Loading menu items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={handleAddClick}
              className="inline-flex items-center space-x-2 bg-primary hover:bg-orange-400 text-white px-6 py-2 rounded-lg font-bold transition-colors duration-200"
            >
              <Plus size={20} />
              <span>Add First Dish</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item._id}
                item={item}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedItem ? 'Edit Dish' : 'Add New Dish'}
        size="lg"
      >
        <MenuItemForm
          item={selectedItem}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </Modal>
    </div>
  )
}

export default Dashboard
