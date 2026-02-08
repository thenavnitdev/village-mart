// API functions for users
import apiClient from './apiClient';

export const fetchUsers = () => apiClient.get('/users');
export const fetchUserById = (id) => apiClient.get(`/users/${id}`);
export const createUser = (data) => apiClient.post('/users', data);
export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
