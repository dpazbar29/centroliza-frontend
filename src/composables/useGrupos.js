import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useGrupos() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  const etapaId = parseInt(route.params.etapa)
  const cursoId = parseInt(route.params.curso)
  const asignaturaId = parseInt(route.params.asignatura)
  
  const grupos = ref([])
  const loading = ref(true)
  
  const cargarGrupos = async () => {
    try {
      loading.value = true
      const { data } = await api.get(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/grupos`)
      grupos.value = data
    } catch (e) {
      console.error('Error cargando grupos:', e)
      grupos.value = []
    } finally {
      loading.value = false
    }
  }
  
  const refreshGrupos = async () => {
    await cargarGrupos()
  }
  
  return {
    centroId, etapaId, cursoId, asignaturaId,
    grupos, loading,
    cargarGrupos, refreshGrupos
  }
}
