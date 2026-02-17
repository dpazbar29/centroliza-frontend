<script setup>
defineProps({
  etapa: Object,
  centroId: Number
})
</script>

<template>
  <div>
    <div>
      <div>
        <h3>{{ etapa.nombre }}</h3>
        <p>Orden: {{ etapa.orden }}</p>
        <p>Años: {{ etapa.anos_duracion }}</p>
        <p>
          Cursos: {{ etapa.cursos_count || 0 }}
        </p>
      </div>
      <router-link :to="`/centros/${centroId}/etapas/${etapa.id}/cursos`">
        Ver Cursos
      </router-link>
    </div>
  </div>
</template>
