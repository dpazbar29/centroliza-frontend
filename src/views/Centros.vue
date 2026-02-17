<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/auth'

const auth = useAuthStore()
const centro = ref(null)
const loading = ref(true)
const error = ref(null)

const cargarCentro = async () => {
  try {
    loading.value = true
    error.value = null
    const { data } = await api.get('/centros')
    centro.value = data[0]
  } catch (e) {
    error.value = 'Error al cargar el centro'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  cargarCentro()
})
</script>

<template>
  <div>
    <h1>Mi Centro Educativo</h1>
    
    <div v-if="loading">Cargando centro...</div>
    
    <div v-else-if="error">
      {{ error }}
    </div>
    
    <div v-else-if="centro">
      <h2>{{ centro.nombre }}</h2>
      <p><strong>Email Director:</strong> {{ centro.email_director }}</p>
      <p><strong>Slug:</strong> {{ centro.slug }}</p>
      
      <!-- Estadísticas del centro -->
      <div>
        <div>
          <h3>Profesores</h3>
          <span>{{ centro.profesores_count || 0 }}</span>
        </div>
        <div>
          <h3>Alumnos</h3>
          <span>{{ centro.alumnos_count || 0 }}</span>
        </div>
        <div>
          <h3>Etapas</h3>
          <span>{{ centro.etapas_count || 0 }}</span>
        </div>
      </div>

      <!-- Acciones del director -->
      <div class="acciones">
        <router-link to="/centros/etapas">Nueva Etapa</router-link>
        <router-link to="/centros/profesores">Gestionar Profesores</router-link>
        <router-link to="/centros/alumnos">Gestionar Alumnos</router-link>
      </div>
    </div>

    <div v-else>
      <p>No tienes un centro asignado.</p>
      <router-link to="/dashboard">Volver al Dashboard</router-link>
    </div>
  </div>
</template>