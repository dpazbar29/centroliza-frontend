<script setup>
import EmptyAlumnosGrupo from '@/components/EmptyAlumnosGrupo.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAsistenciasGrupo } from '@/composables/useAsistenciasGrupo'
import api from '@/api/auth'
import AsistenciasList from '@/components/AsistenciasList.vue'

// Route + Auth
const route = useRoute()
const auth = useAuthStore()
const centroId = computed(() => auth.user?.centro_id || route.params.centro)

// Composables
const { 
  asistencias, 
  alumnosGrupo, 
  loading, 
  cargarAsistencias 
} = useAsistenciasGrupo()

// Estado
const fechaSeleccionada = ref(new Date().toISOString().split('T')[0])
const guardando = ref(false)
const alumnosNombres = reactive({})  // ✅ Reactivo

// Computed
const alumnosConAsistencia = computed(() => {
  const asisMap = {}
  asistencias.value.forEach(a => {
    asisMap[a.alumno_id] = a.estado
  })
  
  return alumnosGrupo.value.map(id => ({
    id,
    estado: asisMap[id] || 'pendiente',
    name: alumnosNombres[id] || `Alumno ${id}`
  })).sort((a, b) => a.name.localeCompare(b.name))
})

onMounted(async () => {
  await cargarNombresAlumnos()
  await cargarAsistencias(fechaSeleccionada.value)
})

const cargarNombresAlumnos = async () => {
  try {
    const { data } = await api.get(`/centros/${centroId.value}/alumnos`)
    data.forEach(al => {
      alumnosNombres[al.id] = al.name  // ✅ Reactivo
    })
  } catch (e) {
    console.error('Error cargando nombres:', e)
  }
}

const marcarAsistencia = async (alumnoId, estado) => {
  guardando.value = true
  try {
    await api.post(
      `/centros/${centroId.value}/etapas/${route.params.etapa}/cursos/${route.params.curso}/asignaturas/${route.params.asignatura}/grupos/${route.params.grupo}/asistencias`,
      { alumno_id: alumnoId, estado, fecha: fechaSeleccionada.value }
    )
    await cargarAsistencias(fechaSeleccionada.value)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    guardando.value = false
  }
}

const cambiarFecha = async () => {
  await cargarAsistencias(fechaSeleccionada.value)
}
</script>

<template>
  <div>
    <div>
      <div>
        <h1>Asistencias - Grupo {{ route.params.grupo }}</h1>
        <p>
          {{ route.params.curso }} → {{ route.params.asignatura }} | 
          {{ loading ? 'Cargando...' : `${alumnosConAsistencia.length} alumnos` }}
        </p>
      </div>
      
      <div>
        <label>Fecha:</label>
        <input v-model="fechaSeleccionada" type="date" @change="cambiarFecha" :disabled="guardando" />
        <button @click="cambiarFecha" :disabled="guardando">Recargar</button>
      </div>
    </div>

    <div v-if="loading">Cargando asistencias...</div>

    <AsistenciasList 
      v-else-if="alumnosConAsistencia.length"
      :alumnos-con-asistencia="alumnosConAsistencia"
      :guardando="guardando"
      @marcarAsistencia="marcarAsistencia"
    />

    <EmptyAlumnosGrupo 
      v-else 
      :centro-id="centroId"
      :etapa="route.params.etapa" 
      :curso="route.params.curso"
    />
  </div>
</template>