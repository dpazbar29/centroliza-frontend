<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authAPI } from '@/api/auth.js';

const router = useRouter();
const user = ref(null);
const loading = ref(true);
const loggingOut = ref(false);  // ← GUARD

onMounted(async () => {
  if (loggingOut.value) return;  // ← EVITAR /me durante logout
  
  try {
    const { data } = await authAPI.me();
    user.value = data.user;
  } catch (error) {
    console.error('Me error:', error.response?.status);
    router.push('/');
  } finally {
    loading.value = false;
  }
});

const logout = async () => {
  loggingOut.value = true;  // ← SET GUARD
  
  try {
    await authAPI.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  // Limpiar storage
  localStorage.removeItem('auth_token');
  
  //TIMEOUT evita onMounted race condition
  setTimeout(() => {
    router.push('/');
  }, 100);
};
</script>

<template>
  <div v-if="loading">
    Cargando Dashboard...
  </div>
  
  <div v-else-if="user && !loggingOut">
    <!-- Dashboard -->
    <h1>Dashboard {{ user.name }}</h1>
    <p>Rol: {{ user.role }} | Status: {{ user.status }}</p>
    
    <button @click="logout">
      Cerrar Sesión
    </button>
  </div>
</template>
