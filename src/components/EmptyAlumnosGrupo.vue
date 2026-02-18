<script setup>
defineProps({
  centroId: String,
  etapa: String,
  curso: String
})
</script>

<template>
  <div>
    <p>No hay alumnos activos en este grupo</p>
    <router-link :to="`/centros/${centroId}/etapas/${etapa}/cursos/${curso}/matriculas`">
      Gestionar Matrículas
    </router-link>
  </div>
</template>
