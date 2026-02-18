<script setup>
defineProps({
  visible: Boolean,
  loading: Boolean,
  form: Object
})

defineEmits(['submit', 'update:visible'])
</script>

<template>
  <div v-if="visible" @click.self="$emit('update:visible', false)">
    <div>
      <h3>Nueva Matrícula</h3>
      
      <form @submit.prevent="$emit('submit')">
        <div>
          <label>Alumno</label>
          <slot name="alumnos-select"></slot>
        </div>

        <div>
          <label>Grupo</label>
          <slot name="grupos-select"></slot>
        </div>

        <div>
          <button type="button" @click="$emit('update:visible', false)">Cancelar</button>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Guardando...' : 'Matricular' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
