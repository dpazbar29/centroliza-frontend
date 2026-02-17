import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Centros from '@/views/Centros.vue';
import UnirseCentro from '@/views/UnirseCentro.vue';
import CentrosEtapas from '@/views/CentrosEtapas.vue';
import CentrosEtapasCursos from '@/views/CentrosEtapasCursos.vue';
import CentrosEtapasCursosAsignaturas from '@/views/CentrosEtapasCursosAsignaturas.vue';
import CentrosEtapasCursosAsignaturasProfesores from '@/views/CentrosEtapasCursosAsignaturasProfesores.vue';
import CentrosEtapasCursosAsignaturasGrupos from '@/views/CentrosEtapasCursosAsignaturasGrupos.vue';
import CentroProfesores from '@/views/CentroProfesores.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true } },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/centros', name: 'centros', component: Centros, meta: { requiresAuth: true } },
  { path: '/unirse-centro', name: 'unirse-centro', component: UnirseCentro, meta: { requiresAuth: true } },
  { path: '/centros/:centro/etapas', name: 'CentrosEtapas', component: CentrosEtapas, meta: { requiresAuth: true } },
  { path: '/centros/:centro/etapas/:etapa/cursos', name: 'CentrosEtapasCursos', component: CentrosEtapasCursos, meta: { requiresAuth: true } },
  { path: '/centros/:centro/etapas/:etapa/cursos/:curso/asignaturas', name: 'CentrosEtapasCursosAsignaturas', component: CentrosEtapasCursosAsignaturas, meta: { requiresAuth: true } },
  { path: '/centros/:centro/etapas/:etapa/cursos/:curso/asignaturas/:asignatura/profesores', name: 'CentrosEtapasCursosAsignaturasProfesores', component: CentrosEtapasCursosAsignaturasProfesores, meta: { requiresAuth: true } },
  { path: '/centros/:centro/etapas/:etapa/cursos/:curso/asignaturas/:asignatura/grupos', name: 'CentrosEtapasCursosAsignaturasGrupos', component: CentrosEtapasCursosAsignaturasGrupos, meta: { requiresAuth: true } },
  { path: '/centros/:centro/profesores', name: 'CentroProfesores', component: CentroProfesores, meta: { requiresAuth: true } },
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