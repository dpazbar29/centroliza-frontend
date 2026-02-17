<script setup>
import AsignaturaCard from '@/components/AsignaturaCard.vue'

defineProps({
  asignaturas: Array,
  loading: Boolean,
  centroId: Number,
  etapaId: Number,
  cursoId: Number
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <div v-if="loading">
      <p>Cargando asignaturas...</p>
    </div>

    <div v-else-if="asignaturas.length === 0">
      <p>No hay asignaturas en este curso</p>
      <slot name="empty-action"></slot>
    </div>

    <div v-else>
      <AsignaturaCard 
        v-for="asignatura in asignaturas"
        :key="asignatura.id"
        :asignatura="asignatura"
        :centro-id="centroId"
        :etapa-id="etapaId"
        :curso-id="cursoId"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>
