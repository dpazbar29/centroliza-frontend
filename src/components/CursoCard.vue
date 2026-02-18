<script setup>
defineProps({
  curso: Object,
  centroId: Number,
  etapaId: Number,
  onEdit: Function,
  onDelete: Function
})
</script>

<template>
  <div>
    <div>
      <div>
        <h3>{{ curso.nombre }}</h3>
        <p>Código: {{ curso.codigo_curso || 'N/A' }}</p>
        <p>Año académico: {{ curso.ano_academico }}</p>
      </div>
      <div>
        <router-link 
          :to="`/centros/${centroId}/etapas/${etapaId}/cursos/${curso.id}/matriculas`"
        >
          Matrículas
        </router-link>
        <router-link 
          :to="`/centros/${centroId}/etapas/${etapaId}/cursos/${curso.id}/asignaturas`"
        >
          Asignaturas
        </router-link>
        <button 
          @click="$emit('edit', curso)"
          title="Editar"
        >
          Editar
        </button>
        <button 
          @click="$emit('delete', curso.id)"
          title="Eliminar"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
