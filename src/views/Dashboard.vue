<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authAPI } from '@/api/auth.js';  // ← IMPORT

const router = useRouter();
const user = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await authAPI.me();
    user.value = data.user;
  } catch (error) {
    console.error('Me error:', error.response?.status);
    router.push('/login');
  } finally {
    loading.value = false;
  }
});

const logout = async () => {
  try {
    await authAPI.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
  router.push('/login');
};
</script>

<template>
  <div v-if="loading">
    <div>Cargando Dashboard...</div>
  </div>
  
  <div v-else-if="user">
    <div>
      <!-- Header -->
      <div>
        <div>
          <h1>
            Dashboard
          </h1>
          <p>Bienvenido de vuelta</p>
        </div>
        <button 
          @click="logout"
        >
          Cerrar Sesión
        </button>
      </div>
      
      <!-- User Card -->
      <div>
        <h2>Perfil</h2>
        <div>
          <div>
            <p><strong>Nombre:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>
          <div>
            <p><strong>Rol:</strong> 
              <span>
                {{ user.role }}
              </span>
            </p>
            <p><strong>Status:</strong> 
              <span>
                {{ user.status }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
