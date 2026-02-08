// API functions for orders
import apiClient from './apiClient';

export const fetchOrders = () => apiClient.get('/orders');
export const fetchOrderById = (id: string | number) => apiClient.get(`/orders/${id}`);
export const createOrder = (data: any) => apiClient.post('/orders', data);
export const updateOrder = (id: string | number, data: any) => apiClient.put(`/orders/${id}`, data);
export const deleteOrder = (id: string | number) => apiClient.delete(`/orders/${id}`);

