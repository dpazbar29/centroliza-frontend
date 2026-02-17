<script setup>
const props = defineProps({
  visible: Boolean,
  loading: Boolean,
  form: Object,
  editMode: Boolean
})

const emit = defineEmits(['submit', 'update:visible'])
</script>

<template>
  <div v-if="props.visible" @click.self="$emit('update:visible', false)">
    <div>
      <h3>{{ props.editMode ? 'Editar Curso' : 'Nuevo Curso' }}</h3>
      <form @submit.prevent="$emit('submit')">
        <div>
          <label>Nombre</label>
          <input 
            v-model="props.form.nombre"
            placeholder="Ej: 1º Primaria A"
            required
          />
        </div>
        
        <div>
          <label>Código curso (opcional)</label>
          <input 
            v-model="props.form.codigo_curso"
            placeholder="1PA"
            maxlength="20"
          />
        </div>
        
        <div>
          <label>Año académico</label>
          <input 
            v-model="props.form.ano_academico"
            type="number"
            min="2000"
            max="2030"
            required
          />
        </div>
        
        <div>
          <button 
            type="button" 
            @click="$emit('update:visible', false)"
            :disabled="props.loading"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            :disabled="props.loading"
          >
            {{ props.loading ? 'Guardando...' : (props.editMode ? 'Actualizar' : 'Crear Curso') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
