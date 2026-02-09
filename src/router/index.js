import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true } },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async(to, from, next) => {
  const auth = useAuthStore()

  if (auth.token && !auth.user) {
    try {
      await auth.fetchMe()
    } catch {
      auth.logout()
    }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'login' })
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router