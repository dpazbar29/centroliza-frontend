<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/auth'

const router = useRouter()
const auth = useAuthStore()
const centroId = ref('')
const loading = ref(false)
const error = ref(null)

const unirse = async () => {
  const id = parseInt(centroId.value)
  if (!id || id <= 0) {
    error.value = 'Introduce un ID válido (ej: 1, 2, 3...)'
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    await api.post(`/centros/${id}/unirse`)
    await auth.fetchMe()
    router.push('/dashboard')
  } catch (e) {
    error.value = e.response?.data?.error || 'ID de centro no válido o ya estás en un centro'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Unirme a un Centro por ID</h1>
    <p>Introduce el ID del centro que te ha dado el director.</p>
    
    <form @submit.prevent="unirse">
      <div>
        <label>ID del Centro</label>
        <input 
          v-model="centroId" 
          type="number" 
          placeholder="1"
          min="1"
          :disabled="loading"
        />
      </div>
      
      <button type="submit" :disabled="loading || !centroId">
        {{ loading ? 'Uniendo...' : 'Unirme al Centro' }}
      </button>
      
      <p v-if="error">{{ error }}</p>
    </form>
    
    <router-link to="/dashboard">← Volver al Dashboard</router-link>
  </div>
</template>
