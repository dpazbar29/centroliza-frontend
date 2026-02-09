<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div>
    <header>
      <router-link to="/">Inicio</router-link>
      <template v-if="!auth.isAuthenticated">
        <router-link to="/login">Iniciar sesión</router-link>
        <router-link to="/register">Registrarse</router-link>
      </template>
      <template v-else>
        <span>Hola, {{ auth.user?.name }}</span>
        <router-link to="/dashboard">Panel</router-link>
        <button @click="handleLogout">Salir</button>
      </template>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>
