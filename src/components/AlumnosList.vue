<script setup>
import AlumnoCard from '@/components/AlumnoCard.vue'

defineProps({
  alumnos: Array,
  loading: Boolean
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <div v-if="loading">Cargando alumnos...</div>
    <div v-else-if="!alumnos.length">
      <p>No hay alumnos en este centro</p>
    </div>
    <div v-else>
      <AlumnoCard
        v-for="alumno in alumnos"
        :key="alumno.id"
        :alumno="alumno"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>
