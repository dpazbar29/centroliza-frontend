import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useGruposCurso() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  const etapaId = parseInt(route.params.etapa)
  const cursoId = parseInt(route.params.curso)
  
  const grupos = ref([])
  const loading = ref(true)

  const cargarGrupos = async () => {
    try {
      loading.value = true
      const { data: asignaturas } = await api.get(
        `/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas`
      )
      
      grupos.value = asignaturas.flatMap(asig => 
        (asig.grupos || []).map(grupo => ({
          id: grupo.id,
          nombre_grupo: grupo.nombre_grupo,
          profesor_tutor_id: grupo.profesor_tutor_id,
          capacidad_maxima: grupo.capacidad_maxima,
          asignatura_nombre: asig.nombre
        }))
      )
    } catch (e) {
      console.error('Error cargando grupos:', e)
      grupos.value = []
    } finally {
      loading.value = false
    }
  }

  const refreshGrupos = async () => await cargarGrupos()

  return { centroId, etapaId, cursoId, grupos, loading, cargarGrupos, refreshGrupos }
}
