<script setup>
import GrupoCard from '@/components/GrupoCard.vue'

const props = defineProps({
  grupos: Array,
  loading: Boolean,
  centroId: Number,
  etapaId: Number,
  cursoId: Number,
  asignaturaId: Number,
  profesoresCentro: Array 
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <div v-if="loading">
      <p>Cargando grupos...</p>
    </div>

    <div v-else-if="grupos.length === 0">
      <p>No hay grupos en esta asignatura</p>
    </div>

    <div v-else>
      <GrupoCard 
        v-for="grupo in grupos"
        :key="grupo.id"
        :grupo="grupo"
        :centro-id="centroId"
        :etapa-id="etapaId"
        :curso-id="cursoId"
        :asignatura-id="asignaturaId"
        :profesores-centro="props.profesoresCentro"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>
