<script setup>
defineProps({
  centro: Object
})
</script>

<template>
  <div v-if="centro">
    <div>
      <div>
        <h3>Profesores</h3>
        <span>{{ centro.profesores_count || 0 }}</span>
      </div>
      <div>
        <h3>Alumnos</h3>
        <span>{{ centro.alumnos_count || 0 }}</span>
      </div>
      <div>
        <h3>Etapas</h3>
        <span>{{ centro.etapas_count || 0 }}</span>
      </div>
    </div>
  </div>
</template>
