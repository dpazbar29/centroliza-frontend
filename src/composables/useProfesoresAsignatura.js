import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useProfesoresAsignatura() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  const etapaId = parseInt(route.params.etapa)
  const cursoId = parseInt(route.params.curso)
  const asignaturaId = parseInt(route.params.asignatura)
  
  const profesoresAsignados = ref([])
  const profesoresCentro = ref([])
  const loadingAsignatura = ref(true)
  const loadingCentro = ref(true)
  
  const cargarProfesoresAsignatura = async () => {
    try {
      loadingAsignatura.value = true
      const { data } = await api.get(
        `/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}`
      )
      profesoresAsignados.value = data.profesores || []
    } catch (e) {
      console.error('Error cargando profesores asignados:', e)
      profesoresAsignados.value = []
    } finally {
      loadingAsignatura.value = false
    }
  }
  
  const cargarProfesoresCentro = async () => {
    try {
      loadingCentro.value = true
      const { data } = await api.get(`/centros/${centroId}/profesores`)
      
      profesoresCentro.value = (data.data || data).map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        dni: p.dni
      }))
    } catch (e) {
      console.error('Error:', e)
      profesoresCentro.value = []
    } finally {
      loadingCentro.value = false
    }
  }
  
  const refreshProfesoresAsignatura = async () => {
    await cargarProfesoresAsignatura()
  }
  
  const refreshProfesoresCentro = async () => {
    await cargarProfesoresCentro()
  }
  
  return {
    centroId, etapaId, cursoId, asignaturaId,
    profesoresAsignados, profesoresCentro, 
    loadingAsignatura, loadingCentro,
    cargarProfesoresAsignatura, cargarProfesoresCentro,
    refreshProfesoresAsignatura, refreshProfesoresCentro
  }
}
