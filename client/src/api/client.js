const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export class ApiError extends Error {
  constructor(message, details) {
    super(message);
    this.details = details;
  }
}

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.message || 'Request failed', data.details);
  }

  return data;
};

export const api = {
  getMenu: (params = {}) => {
    const search = new URLSearchParams(params).toString();
    return apiRequest(`/menu${search ? `?${search}` : ''}`);
  },
  createMenuItem: (payload) => apiRequest('/menu', { method: 'POST', body: JSON.stringify(payload) }),
  updateMenuItem: (id, payload) => apiRequest(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteMenuItem: (id) => apiRequest(`/menu/${id}`, { method: 'DELETE' }),
  createOrder: (payload) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getOrders: () => apiRequest('/orders'),
  updateOrderStatus: (id, status) => apiRequest(`/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  login: (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
};
