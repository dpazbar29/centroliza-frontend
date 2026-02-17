import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useAsignaturas() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  const etapaId = parseInt(route.params.etapa)
  const cursoId = parseInt(route.params.curso)
  
  const asignaturas = ref([])
  const loading = ref(true)
  
  const cargarAsignaturas = async () => {
    try {
      loading.value = true
      const { data } = await api.get(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas`)
      asignaturas.value = data
    } catch (e) {
      console.error('Error cargando asignaturas:', e)
    } finally {
      loading.value = false
    }
  }
  
  const refreshAsignaturas = async () => {
    await cargarAsignaturas()
  }
  
  return {
    centroId,
    etapaId,
    cursoId,
    asignaturas,
    loading,
    cargarAsignaturas,
    refreshAsignaturas
  }
}
