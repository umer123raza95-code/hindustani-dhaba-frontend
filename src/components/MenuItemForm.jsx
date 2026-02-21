import React, { useState } from 'react'
import { X } from 'lucide-react'

const MenuItemForm = ({ item, onSubmit, onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    image: '',
    isAvailable: true,
    spiceLevel: 'Medium',
    vegetarian: false,
    ...item,
  })

  const [preview, setPreview] = useState(item?.image || '')
  const [errors, setErrors] = useState({})

  const categories = ['Starter', 'Main Course', 'Sweets', 'Drinks', 'Desserts', 'Beverages']
  const spiceLevels = ['Mild', 'Medium', 'Spicy']

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      setFormData(prev => ({
        ...prev,
        image: reader.result
      }))
    }
    reader.readAsDataURL(file)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
      onClose()
    } else {
      setErrors(newErrors)
    }
  }

  /* ================= STYLES ================= */

  const inputClasses =
    'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition'

  const labelClasses = 'block text-sm font-semibold text-gray-700 mb-2'

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3">

      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl max-h-[95vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-bold text-lg">
            {item ? 'Update Menu Item' : 'Add Menu Item'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={22}/>
          </button>
        </div>

        {/* SCROLL AREA */}
        <div className="overflow-y-auto px-5 py-4">

          <form onSubmit={handleSubmit} className="space-y-5 pb-28">

            {/* NAME */}
            <div>
              <label className={labelClasses}>Dish Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses}/>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className={labelClasses}>Description *</label>
              <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className={`${inputClasses} resize-none`}/>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* PRICE */}
            <div>
              <label className={labelClasses}>Price (₹) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" className={inputClasses}/>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* CATEGORY + SPICE */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">

              <div>
                <label className={labelClasses}>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className={inputClasses}>
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClasses}>Spice Level</label>
                <select name="spiceLevel" value={formData.spiceLevel} onChange={handleChange} className={inputClasses}>
                  {spiceLevels.map(level => <option key={level}>{level}</option>)}
                </select>
              </div>

            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className={labelClasses}>Dish Image</label>

              {!preview ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-orange-400 transition">
                  <span className="text-sm text-gray-500">Click to upload image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
                </label>
              ) : (
                <div className="relative">
                  <img src={preview} alt="preview" className="w-full h-44 object-cover rounded-xl border"/>
                  <button
                    type="button"
                    onClick={()=>{
                      setPreview('')
                      setFormData(prev => ({ ...prev, image:'' }))
                    }}
                    className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1"
                  >
                    <X size={18}/>
                  </button>
                </div>
              )}
            </div>

            {/* CHECKBOXES */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">

              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer active:scale-95 transition">
                <input type="checkbox" name="vegetarian" checked={formData.vegetarian} onChange={handleChange}/>
                <span className="font-medium">Vegetarian</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer active:scale-95 transition">
                <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange}/>
                <span className="font-medium">Available</span>
              </label>

            </div>

          </form>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="border-t p-3 flex gap-3 bg-white">

          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border rounded-xl font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
          >
            {item ? 'Update Dish' : 'Add Dish'}
          </button>

        </div>

      </div>
    </div>
  )
}

export default MenuItemForm
