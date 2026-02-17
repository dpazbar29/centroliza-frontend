<script setup>
const props = defineProps({
  profesor: Object
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <div>
      <h3>{{ props.profesor.name }}</h3>
      <p><strong>Email:</strong> {{ props.profesor.email || 'N/A' }}</p>
      <p><strong>DNI:</strong> {{ props.profesor.dni || 'N/A' }}</p>
      <p><strong>Teléfono:</strong> {{ props.profesor.telefono || 'N/A' }}</p>
      <p><strong>Nacimiento:</strong> {{ props.profesor.fecha_nacimiento || 'N/A' }}</p>
    </div>
    
    <div>
      <button @click="$emit('edit', props.profesor)">Editar</button>
      <button @click="$emit('delete', props.profesor.id)">Eliminar</button>
    </div>
  </div>
</template>
