<script setup>
defineProps({
  centro: Object
})
</script>

<template>
  <div v-if="centro">
    <h2>{{ centro.nombre }}</h2>
    <p><strong>Email Director:</strong> {{ centro.email_director }}</p>
    <p><strong>Slug:</strong> {{ centro.slug }}</p>
  </div>
</template>
