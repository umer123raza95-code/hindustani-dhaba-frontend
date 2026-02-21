import api from '../utils/api'

export const getMenuItems = async () => {
  const response = await api.get('/menu')
  return response.data
}

export const addMenuItem = async (menuItem) => {
  const response = await api.post('/menu', menuItem)
  return response.data
}

export const updateMenuItem = async (id, menuItem) => {
  const response = await api.put(`/menu/${id}`, menuItem)
  return response.data
}

export const deleteMenuItem = async (id) => {
  const response = await api.delete(`/menu/${id}`)
  return response.data
}
