<script setup>
import MatriculaCard from './MatriculaCard.vue';
defineProps({
  matriculas: Array,
  gruposDisponibles: Array,
  loading: Boolean,
  editandoId: Number,
  editForm: Object
})

defineEmits(['editar', 'eliminar', 'actualizar', 'cancelar'])
</script>

<template>
  <section>
    <h2>Matrículas ({{ matriculas.length }})</h2>
    
    <div v-if="!matriculas.length">
      <p>No hay matrículas en este curso</p>
      <slot name="empty-action"></slot>
    </div>

    <div v-else class="grid">
      <MatriculaCard
        v-for="matricula in matriculas" 
        :key="matricula.id"
        :matricula="matricula"
        :grupos-disponibles="gruposDisponibles"
        :editando-id="editandoId"
        :edit-form="editForm"
        @editar="$emit('editar', $event)"
        @eliminar="$emit('eliminar', $event)"
        @actualizar="$emit('actualizar')"
        @cancelar="$emit('cancelar')"
      />
    </div>
  </section>
</template>
