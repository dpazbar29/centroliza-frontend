<script setup>
import ProfesorCard from '@/components/ProfesorCard.vue'

defineProps({
  profesores: Array,
  loading: Boolean
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <div v-if="loading">Cargando profesores...</div>
    <div v-else-if="!profesores.length">
      <p>No hay profesores en este centro</p>
    </div>
    <div v-else>
      <ProfesorCard 
        v-for="profesor in profesores"
        :key="profesor.id"
        :profesor="profesor"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>
