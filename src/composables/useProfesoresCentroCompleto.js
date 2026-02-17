import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useProfesoresCentroCompleto() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)
  
  const profesores = ref([])
  const loading = ref(true)

  const cargarProfesores = async () => {
    try {
      loading.value = true
      const { data } = await api.get(`/centros/${centroId}/profesores`)

      profesores.value = data.map(prof => ({
        id: prof.id,
        name: prof.name,
        email: prof.email,
        dni: prof.dni || '',
        telefono: prof.telefono || '',
        fecha_nacimiento: prof.fecha_nacimiento ? new Date(prof.fecha_nacimiento).toISOString().split('T')[0] : ''
      }))
    } catch (e) {
      console.error('Error cargando profesores:', e)
      profesores.value = []
    } finally {
      loading.value = false
    }
  }

  const refreshProfesores = async () => {
    profesores.value = []
    loading.value = true
    await cargarProfesores()
  }

  return {
    centroId,
    profesores,
    loading,
    refreshProfesores
  }
}
