<script setup>
const props = defineProps({
  visible: Boolean,
  loading: Boolean,
  form: Object,
  title: String
})

const emit = defineEmits(['submit', 'update:visible'])
</script>

<template>
  <div v-if="props.visible" @click.self="$emit('update:visible', false)">
    <div>
      <h3>{{ props.title }}</h3>
      <form @submit.prevent="$emit('submit')">
        <div>
          <label>Nombre del grupo</label>
          <input 
            v-model="props.form.nombre_grupo" 
            placeholder="Ej: Grupo A" 
            required 
            maxlength="20" 
          />
        </div>
        
        <div>
          <label>Código (opcional)</label>
          <input 
            v-model="props.form.codigo" 
            placeholder="GA" 
            maxlength="20" 
          />
        </div>
        
        <div>
          <label>Capacidad máxima *</label>
          <input 
            v-model.number="props.form.capacidad_maxima" 
            type="number" 
            min="1" 
            max="50" 
            required 
          />
        </div>
        
        <div>
          <label>Profesor tutor (opcional)</label>
          <select v-model="props.form.profesor_tutor_id">
            <option value="">Seleccionar profesor</option>
          </select>
        </div>
        
        <div>
          <button type="button" @click="$emit('update:visible', false)" :disabled="props.loading">
            Cancelar
          </button>
          <button type="submit" :disabled="props.loading">
            {{ props.loading ? 'Guardando...' : (props.title.includes('Editar') ? 'Actualizar' : 'Crear Grupo') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

