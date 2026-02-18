<script setup>
const props = defineProps({
  alumno: Object
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="alumno-card">
    <div>
      <h3>{{ props.alumno.name }}</h3>
      <p><strong>Email:</strong> {{ props.alumno.email }}</p>
      <p><strong>DNI:</strong> {{ props.alumno.dni || 'N/A' }}</p>
      <p><strong>Teléfono:</strong> {{ props.alumno.telefono || 'N/A' }}</p>
      <p><strong>Fecha nacimiento:</strong> {{ props.alumno.fecha_nacimiento || 'N/A' }}</p>
    </div>

    <div>
      <button @click="$emit('edit', props.alumno)">Editar</button>
      <button @click="$emit('delete', props.alumno.id)">Eliminar</button>
    </div>
  </div>
</template>
