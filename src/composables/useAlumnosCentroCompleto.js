import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/auth'

export function useAlumnosCentroCompleto() {
  const route = useRoute()
  const centroId = parseInt(route.params.centro)

  const alumnos = ref([])
  const loading = ref(true)

  const cargarAlumnos = async () => {
    try {
      loading.value = true
      const { data } = await api.get(`/centros/${centroId}/alumnos`)

      alumnos.value = data.map(al => ({
        id: al.id,
        name: al.name,
        email: al.email,
        dni: al.dni || '',
        telefono: al.telefono || '',
        fecha_nacimiento: al.fecha_nacimiento ? new Date(al.fecha_nacimiento).toISOString().split('T')[0] : ''
      }))
    } catch (e) {
      console.error('Error cargando alumnos:', e)
      alumnos.value = []
    } finally {
      loading.value = false
    }
  }

  const refreshAlumnos = async () => {
    alumnos.value = []
    loading.value = true
    await cargarAlumnos()
  }

  return {
    centroId,
    alumnos,
    loading,
    refreshAlumnos
  }
}
