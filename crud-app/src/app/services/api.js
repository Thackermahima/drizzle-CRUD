import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend API
});

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const addUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Update user
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
