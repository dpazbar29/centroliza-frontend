<script setup>
import AlumnoAsistenciaRow from './AlumnoAsistenciaRow.vue'

defineProps({
  alumnosConAsistencia: Array,
  guardando: Boolean
})

defineEmits(['marcarAsistencia'])
</script>

<template>
  <div>
    <AlumnoAsistenciaRow 
      v-for="alumno in alumnosConAsistencia" 
      :key="alumno.id"
      :alumno="alumno"
      :guardando="guardando"
      @marcarAsistencia="(alumnoId, estado) => $emit('marcarAsistencia', alumnoId, estado)"
    />
  </div>
</template>
