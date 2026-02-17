<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProfesoresAsignatura } from '@/composables/useProfesoresAsignatura'
import api from '@/api/auth'

const route = useRoute()
const auth = useAuthStore()
const { 
  centroId, etapaId, cursoId, asignaturaId, 
  profesoresAsignados, profesoresCentro, 
  loadingAsignatura, loadingCentro,
  refreshProfesoresAsignatura, refreshProfesoresCentro 
} = useProfesoresAsignatura()

const saving = ref(false)

const loading = computed(() => loadingAsignatura.value || loadingCentro.value)

const profesoresAsignadosIds = computed(() => 
  profesoresAsignados.value.map(p => p.id)
)

const toggleProfesor = async (profesorId) => {
  saving.value = true
  try {
    const asignado = profesoresAsignadosIds.value.includes(profesorId)
    
    if (asignado) {
      await api.delete(
        `/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/profesores/${profesorId}`
      )
    } else {
      await api.post(
        `/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/profesores`, 
        { profesor_id: profesorId }
      )
    }
    await refreshProfesoresAsignatura()
  } catch (e) {
    console.error('Error asignando profesor:', e)
    alert('Error al asignar profesor')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  console.log('Cargando datos...', { centroId, etapaId, cursoId, asignaturaId })
  await Promise.all([
    refreshProfesoresAsignatura(),
    refreshProfesoresCentro()
  ])
  console.log('Datos cargados:', {
    asignados: profesoresAsignados.value.length,
    totalCentro: profesoresCentro.value.length
  })
})
</script>

<template>
  <div>
    <!-- Header -->
    <div>
      <div>
        <h1>Profesores Asignados</h1>
        <p>Asignatura ID: {{ asignaturaId }} | Curso: {{ cursoId }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading">
      <p>Cargando profesores...</p>
    </div>

    <!-- Sin profesores en el centro -->
    <div v-else-if="!profesoresCentro.length">
      <p>No hay profesores en este centro</p>
      <router-link 
        :to="`/centros/${centroId}/profesores`" 
      >
        Gestionar Profesores
      </router-link>
    </div>

    <!-- Lista profesores -->
    <div v-else>
      <div 
        v-for="profesor in profesoresCentro" 
        :key="profesor.id"
        :class="{ 'asignado': profesoresAsignadosIds.includes(profesor.id) }"
      >
        <div>
          <p>{{ profesor.name }} {{ profesor.email || 'Sin email' }}</p>
        </div>
        
        <label>
          <input 
            type="checkbox" 
            :checked="profesoresAsignadosIds.includes(profesor.id)"
            @click.prevent="toggleProfesor(profesor.id)"
            :disabled="saving"
          />
          <span></span>
          <span>
            {{ profesoresAsignadosIds.includes(profesor.id) ? 'Asignado' : 'Asignar' }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>
