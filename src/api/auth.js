import axios from 'axios';

const api = axios.create({
  baseURL: '/api',        // Proxy → http://127.0.0.1:8000/api
  withCredentials: true   // Sanctum cookies CSRF
});

// Interceptor: Auto Bearer desde localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor 401 → Logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // LOGIN: CSRF → Login → Guardar Token
  async login(data) {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post('/auth/login', data);
    
    // GUARDAR TOKEN
    const token = response.data.token;
    localStorage.setItem('auth_token', token);
    
    return response;
  },

  // REGISTER: CSRF → Register → Guardar Token
  async register(data) {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post('/auth/register', data);
    
    const token = response.data.token;
    localStorage.setItem('auth_token', token);
    
    return response;
  },

  // ME: Auto Bearer
  me() {
    return api.get('/auth/me');
  },

  // LOGOUT: Limpiar token
  async logout() {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
    return response;
  }
};
