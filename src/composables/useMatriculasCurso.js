import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useMatriculasCurso() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  const etapaId = parseInt(route.params.etapa)
  const cursoId = parseInt(route.params.curso)
  
  const matriculas = ref([])
  const loading = ref(true)

  const cargarMatriculas = async () => {
    try {
      loading.value = true
      const { data } = await api.get(
        `/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/matriculas`
      )
      matriculas.value = data
    } catch (e) {
      console.error('Error cargando matrículas:', e)
      matriculas.value = []
    } finally {
      loading.value = false
    }
  }

  const refreshMatriculas = async () => await cargarMatriculas()

  return { centroId, etapaId, cursoId, matriculas, loading, cargarMatriculas, refreshMatriculas }
}
