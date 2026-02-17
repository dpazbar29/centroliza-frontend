<script setup>
    import { defineProps, defineEmits } from 'vue'

    const props = defineProps({
    visible: Boolean,
    loading: Boolean,
    form: Object
    })

    const emit = defineEmits(['submit', 'update:visible'])
</script>

<template>
  <div v-if="props.visible" @click.self="$emit('update:visible', false)">
    <div>
      <h3>Nueva Etapa</h3>
      <form @submit.prevent="$emit('submit')">
        <div>
          <label>Nombre</label>
          <input 
            v-model="props.form.nombre"
            placeholder="Infantil, Primaria..."
            required
          />
        </div>
        
        <div>
          <div>
            <label>Orden</label>
            <input 
              v-model.number="props.form.orden"
              type="number"
              min="1"
              required
            />
          </div>
          <div>
            <label>Años duración</label>
            <input 
              v-model.number="props.form.anos_duracion"
              type="number"
              min="1"
              max="6"
              required
            />
          </div>
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
            {{ props.loading ? 'Creando...' : 'Crear Etapa' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
