<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProfesoresCentroCompleto } from '@/composables/useProfesoresCentroCompleto'
import ProfesoresList from '@/components/ProfesoresList.vue'
import ProfesorFormModal from '@/components/ProfesorFormModal.vue'
import api from '@/api/auth'

const route = useRoute()
const auth = useAuthStore()
const centroId = computed(() => auth.user?.centro_id || route.params.centro)

const { 
  profesores, 
  loading, 
  refreshProfesores 
} = useProfesoresCentroCompleto()

const modalVisible = ref(false)
const editMode = ref(false)
const form = ref({
  name: '',
  email: '',
  dni: '',
  telefono: '',
  fecha_nacimiento: '',
  password: '',
  password_confirmation: ''
})

const submitLoading = ref(false)
const profesorEditando = ref(null)

const abrirModal = (profesor = null) => {
  if (profesor) {
    editMode.value = true
    profesorEditando.value = profesor
    const fechaNac = profesor.fecha_nacimiento ? new Date(profesor.fecha_nacimiento).toISOString().split('T')[0] : ''
    form.value = { 
      name: profesor.name || '',
      email: profesor.email || '',
      dni: profesor.dni || '',
      telefono: profesor.telefono || '',
      fecha_nacimiento: fechaNac
    }
  } else {
    editMode.value = false
    profesorEditando.value = null
    form.value = { 
      name: '', 
      email: '', 
      dni: '', 
      telefono: '', 
      fecha_nacimiento: '',
      password: '' 
    }
  }
  modalVisible.value = true
}

const guardarProfesor = async () => {
  submitLoading.value = true
  try {
    if (editMode.value) {
      await api.put(`/centros/${centroId.value}/profesores/${profesorEditando.value.id}`, form.value)
    } else {
      await api.post(`/centros/${centroId.value}/profesores`, form.value)
    }
    modalVisible.value = false
    await new Promise(resolve => setTimeout(resolve, 1000))
    await refreshProfesores()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    submitLoading.value = false
  }
}

const eliminarProfesor = async (profesorId) => {
  if (!confirm('¿Eliminar este profesor?')) return
  try {
    await api.delete(`/centros/${centroId.value}/profesores/${profesorId}`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    await refreshProfesores()
  } catch (e) {
    console.error('Error:', e)
  }
}

onMounted(() => {
  refreshProfesores()
})
</script>

<template>
  <div>
    <div>
      <div>
        <h1>Gestionar Profesores</h1>
        <p>Centro ID: {{ centroId }} | {{ loading ? 'Cargando...' : `${profesores.length} profesores` }}</p>
      </div>
      <button @click="abrirModal()" :disabled="loading">
        Nuevo Profesor
      </button>
    </div>

    <ProfesoresList 
      :profesores="profesores"
      :loading="loading"
      @edit="abrirModal($event)"
      @delete="eliminarProfesor($event)"
    />

    <ProfesorFormModal 
      :visible="modalVisible"
      :loading="submitLoading"
      :form="form"
      :title="editMode ? 'Editar Profesor' : 'Nuevo Profesor'"
      @submit="guardarProfesor"
      @update:visible="modalVisible = $event"
    />
  </div>
</template>
