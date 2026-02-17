import { defineStore } from 'pinia'
import api from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: state => !!state.token,
    role: state => state.user?.role || null,
  },
  actions: {
    async login(credentials) {
      const { data } = await api.post('/login', credentials)
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
    async register(credentials) {
      const { data } = await api.post('/register', credentials)
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
    async fetchMe() {
      if (!this.token) return
      const { data } = await api.get('/me')
      this.user = data
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
  },
})