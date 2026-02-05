import axios from 'axios';

const api = axios.create({
  baseURL: '/api',        // Proxy → http://127.0.0.1:8000/api
  withCredentials: true   // Sanctum cookies CSRF
});
