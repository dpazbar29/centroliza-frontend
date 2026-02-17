<script setup>
    import EtapaCard from '@/components/EtapaCard.vue' 
    defineProps({
        etapas: Array,
        loading: Boolean,
        centroId: Number
    })
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="loading">
      <p>Cargando etapas...</p>
    </div>

    <!-- Vacío -->
    <div v-else-if="etapas.length === 0">
      <p>No hay etapas creadas</p>
      <slot name="empty-action"></slot>
    </div>

    <!-- Lista -->
    <div v-else>
      <EtapaCard 
        v-for="etapa in etapas" 
        :key="etapa.id"
        :etapa="etapa"
        :centro-id="centroId"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>
