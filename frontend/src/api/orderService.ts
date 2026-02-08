// API functions for orders
import apiClient from './apiClient';

export const fetchOrders = () => apiClient.get('/orders');
export const fetchOrderById = (id) => apiClient.get(`/orders/${id}`);
export const createOrder = (data) => apiClient.post('/orders', data);
export const updateOrder = (id, data) => apiClient.put(`/orders/${id}`, data);
export const deleteOrder = (id) => apiClient.delete(`/orders/${id}`);
