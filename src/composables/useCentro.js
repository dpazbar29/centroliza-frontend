import { ref } from 'vue'
import api from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

export function useCentro() {
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

  return {
    centro,
    loading,
    error,
    cargarCentro
  }
}
