import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useAsistenciasGrupo() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  const etapaId = parseInt(route.params.etapa)
  const cursoId = parseInt(route.params.curso)
  const asignaturaId = parseInt(route.params.asignatura)
  const grupoId = parseInt(route.params.grupo)

  const asistencias = ref([])
  const alumnosGrupo = ref([])
  const loading = ref(true)

  const cargarAsistencias = async (fecha = new Date().toISOString().split('T')[0]) => {
    try {
      loading.value = true
      const { data } = await api.get(
        `/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/grupos/${grupoId}/asistencias?fecha=${fecha}`
      )
      asistencias.value = data.asistencias || []
      alumnosGrupo.value = data.alumnos_grupo || []
    } catch (e) {
      console.error('Error:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    centroId, etapaId, cursoId, asignaturaId, grupoId,
    asistencias, alumnosGrupo, loading,
    cargarAsistencias
  }
}
