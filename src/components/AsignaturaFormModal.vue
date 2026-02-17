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
          <label>Nombre</label>
          <input 
            v-model="props.form.nombre"
            placeholder="Ej: Matemáticas"
            required
            maxlength="100"
          />
        </div>
        
        <div>
          <label>Código (opcional)</label>
          <input 
            v-model="props.form.codigo"
            placeholder="MAT"
            maxlength="20"
          />
        </div>
        
        <div>
          <label>Horas semanales</label>
          <input 
            v-model.number="props.form.horas_semanales"
            type="number"
            min="1"
            max="12"
            required
          />
        </div>
        
        <div>
          <label>Tipo</label>
          <select v-model="props.form.tipo">
            <option value="troncal">Troncal</option>
            <option value="especifica">Específica</option>
            <option value="optativa">Optativa</option>
          </select>
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
            {{ props.loading ? 'Guardando...' : (props.title.includes('Editar') ? 'Actualizar' : 'Crear Asignatura') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>