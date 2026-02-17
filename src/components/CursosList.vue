<script setup>
import CursoCard from '@/components/CursoCard.vue'

defineProps({
  cursos: Array,
  loading: Boolean,
  centroId: Number,
  etapaId: Number
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <div v-if="loading">
      <p>Cargando cursos...</p>
    </div>

    <div v-else-if="cursos.length === 0">
      <p>No hay cursos en esta etapa</p>
      <slot name="empty-action"></slot>
    </div>

    <div v-else>
      <CursoCard 
        v-for="curso in cursos"
        :key="curso.id"
        :curso="curso"
        :centro-id="centroId"
        :etapa-id="etapaId"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>
