import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useCursos() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  const etapaId = parseInt(route.params.etapa)
  
  const cursos = ref([])
  const loading = ref(true)
  
  const cargarCursos = async () => {
    try {
      loading.value = true
      const { data } = await api.get(`/centros/${centroId}/etapas/${etapaId}/cursos`)
      cursos.value = data
    } catch (e) {
      console.error('Error cargando cursos:', e)
    } finally {
      loading.value = false
    }
  }
  
  const refreshCursos = async () => {
    await cargarCursos()
  }
  
  return {
    centroId,
    etapaId,
    cursos,
    loading,
    cargarCursos,
    refreshCursos
  }
}
