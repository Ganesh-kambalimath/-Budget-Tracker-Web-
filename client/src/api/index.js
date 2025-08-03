import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Auth Endpoints
export const auth = {
  signup: (data) => api.post('/auth/signup', data),
  signin: (data) => api.post('/auth/signin', data),
};
export const categories = {
  create: (data) => api.post('/categories', data),
  getAll: () => api.get('/categories'),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const transactions = {
  create: (data) => api.post('/transactions', data),
  getAll: (params) => api.get('/transactions', { params }),
  getById: (id) => api.get(`/transactions/${id}`),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
};

export const budgets = {
  create: (data) => api.post('/budgets', data),
  getAll: () => api.get('/budgets'),
  getSummary: (params) => api.get('/budgets/summary', { params }),
  update: (id, data) => api.put(`/budgets/${id}`, data),
  delete: (id) => api.delete(`/budgets/${id}`),
};

export const reports = {
  generate: (params) => api.get('/reports', { params, responseType: params.format === 'pdf'? 'blob' : 'json' }), // For PDF, responseType is 'blob'
};

export default api;
