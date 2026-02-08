// API functions for users
import apiClient from './apiClient';

export const fetchUsers = () => apiClient.get('/users');
export const fetchUserById = (id: string | number) => apiClient.get(`/users/${id}`);
export const createUser = (data: any) => apiClient.post('/users', data);
export const updateUser = (id: string | number, data: any) => apiClient.put(`/users/${id}`, data);
export const deleteUser = (id: string | number) => apiClient.delete(`/users/${id}`);
export const login = (credentials: { email: string; password: string }) => 
  apiClient.post('/auth/login', credentials);
export const register = (userData: any) => apiClient.post('/auth/register', userData);

