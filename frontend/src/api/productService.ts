// API functions for products
import apiClient from './apiClient';

export const fetchProducts = () => apiClient.get('/products');
export const fetchProductById = (id) => apiClient.get(`/products/${id}`);
export const createProduct = (data) => apiClient.post('/products', data);
export const updateProduct = (id, data) => apiClient.put(`/products/${id}`, data);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
