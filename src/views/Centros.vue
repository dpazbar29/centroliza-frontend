<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCentro } from '@/composables/useCentro'
import CentroInfo from '@/components/CentroInfo.vue'
import CentroStats from '@/components/CentroStats.vue'
import CentroActions from '@/components/CentroActions.vue'

const auth = useAuthStore()
const { centro, loading, error, cargarCentro } = useCentro()

// ⭐ PANEL DINÁMICO POR ROL
const panelComponent = computed(() => {
  const role = auth.user?.role
  switch (role) {
    case 'director':
      return 'director'
    case 'profesor':
      return 'profesor'
    case 'alumno':
      return 'alumno'
    case 'padre':
      return 'padre'
    default:
      return 'default'
  }
})

onMounted(() => {
  cargarCentro()
})
</script>

<template>
  <div>
    <h1>Mi Centro Educativo</h1>
    
    <div v-if="loading">Cargando centro...</div>
    <div v-else-if="error">{{ error }}</div>
    
    <template v-else-if="centro">
      
      <div v-if="panelComponent === 'director'">
        <CentroInfo :centro="centro" />
        <CentroStats :centro="centro" />
        <h3>Panel Director</h3>
        <p>Gestión completa del centro educativo.</p>
        <CentroActions />
      </div>
      
      <div v-else-if="panelComponent === 'profesor'">
        <h3>Panel Profesor</h3>
        <p>Tus clases, alumnos y herramientas de enseñanza.</p>
        <div>
          <router-link to="/centros/mis-asignaturas">Mis Asignaturas</router-link>
          <router-link to="/centros/asistencias">Mis Asistencias</router-link>
        </div>
      </div>
      
      <div v-else-if="panelComponent === 'alumno'">
        <h3>Panel Alumno</h3>
        <p>Tus clases, evaluaciones y materiales.</p>
        <div>
          <router-link to="/centros/mis-matriculas">Mis Clases</router-link>
          <router-link to="/centros/evaluaciones">Evaluaciones</router-link>
        </div>
      </div>
      
      <div v-else-if="panelComponent === 'padre'">
        <h3>Panel Padre</h3>
        <p>Progreso de tus hijos y comunicaciones.</p>
        <div>
          <router-link to="/centros/mis-hijos">Mis Hijos</router-link>
          <router-link to="/centros/avisos">Avisos</router-link>
        </div>
      </div>
      
      <div v-else>
        <h3>Panel Usuario</h3>
        <p>Contenido general del centro.</p>
      </div>
    </template>
    
    <div v-else>
      <p>No tienes un centro asignado.</p>
      <router-link to="/dashboard">Volver al Dashboard</router-link>
    </div>
  </div>
</template>
