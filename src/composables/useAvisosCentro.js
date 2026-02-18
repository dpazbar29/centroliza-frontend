import { ref } from 'vue'
import api from '@/api/auth'

export function useAvisosCentro(centroId) {
  const avisos = ref([])
  const loading = ref(false)
  const currentPage = ref(1)

  const cargarAvisos = async (page = 1) => {
    loading.value = true
    try {
      const { data } = await api.get(`/centros/${centroId}/avisos?page=${page}`)
      avisos.value = data.data
      currentPage.value = data.current_page
    } finally {
      loading.value = false
    }
  }

  const crearAviso = async (data) => {
    const response = await api.post(`/centros/${centroId}/avisos`, data)
    await cargarAvisos(1)
    return response.data
  }

  const actualizarAviso = async (id, data) => {
    const response = await api.patch(`/centros/${centroId}/avisos/${id}`, data)
    await cargarAvisos(currentPage.value)
    return response.data
  }

  const eliminarAviso = async (id) => {
    await api.delete(`/centros/${centroId}/avisos/${id}`)
    await cargarAvisos(currentPage.value)
  }

  return {
    avisos,
    loading,
    currentPage,
    cargarAvisos,
    crearAviso,
    actualizarAviso,
    eliminarAviso
  }
}
