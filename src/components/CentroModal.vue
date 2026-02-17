<script setup>
import { ref, watch } from 'vue'
import api from '@/api/auth'

const props = defineProps(['visible', 'loading', 'error'])
const emit = defineEmits(['update:visible', 'create'])

const centroForm = ref({
  nombre: '',
  email_director: ''
})

const handleCreate = async () => {
  try {
    await api.post('/centros', centroForm.value)
    emit('create')
    centroForm.value = { nombre: '', email_director: '' }
  } catch (e) {
    console.error('Error:', e)
  }
}

watch(() => props.visible, (val) => {
  if (!val) centroForm.value = { nombre: '', email_director: '' }
})
</script>

<template>
  <div v-if="props.visible" @click.self="$emit('update:visible', false)">
    <div>
      <div>
        <h3>Crear Centro Educativo</h3>
        <button @click="$emit('update:visible', false)">×</button>
      </div>
      <form @submit.prevent="handleCreate">
        <div>
          <label>Nombre del centro *</label>
          <input v-model="centroForm.nombre" type="text" placeholder="Colegio San Juan" required maxlength="100" />
        </div>
        <div>
          <label>Email del director *</label>
          <input v-model="centroForm.email_director" type="email" placeholder="director@centro.com" required />
        </div>
        <div>
          <button type="button" @click="$emit('update:visible', false)" :disabled="props.loading">Cancelar</button>
          <button type="submit" :disabled="props.loading">
            {{ props.loading ? 'Creando...' : 'Crear Centro' }}
          </button>
        </div>
        <p v-if="props.error">{{ props.error }}</p>
      </form>
    </div>
  </div>
</template>

