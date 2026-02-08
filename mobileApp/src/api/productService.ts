// API functions for products
import apiClient from './apiClient';

export const fetchProducts = () => apiClient.get('/products');
export const fetchProductById = (id: string | number) => apiClient.get(`/products/${id}`);
export const createProduct = (data: any) => apiClient.post('/products', data);
export const updateProduct = (id: string | number, data: any) => apiClient.put(`/products/${id}`, data);
export const deleteProduct = (id: string | number) => apiClient.delete(`/products/${id}`);

