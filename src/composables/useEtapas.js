import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useEtapas() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  
  const etapas = ref([])
  const loading = ref(true)
  
  const cargarEtapas = async () => {
    try {
      loading.value = true
      const { data } = await api.get(`/centros/${centroId}/etapas`)
      etapas.value = data
    } catch (e) {
      console.error('Error cargando etapas:', e)
    } finally {
      loading.value = false
    }
  }
  
  const refreshEtapas = async () => {
    await cargarEtapas()
  }
  
  return {
    centroId,
    etapas,
    loading,
    cargarEtapas,
    refreshEtapas
  }
}
