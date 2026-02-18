<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAlumnosCentroCompleto } from '@/composables/useAlumnosCentroCompleto'
import AlumnosList from '@/components/AlumnosList.vue'
import AlumnoFormModal from '@/components/AlumnoFormModal.vue'
import api from '@/api/auth'

const route = useRoute()
const auth = useAuthStore()
const centroId = computed(() => auth.user?.centro_id || route.params.centro)
const {alumnos, loading, refreshAlumnos} = useAlumnosCentroCompleto()

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
const alumnoEditando = ref(null)

const abrirModal = (alumno = null) => {
  if (alumno) {
    editMode.value = true
    alumnoEditando.value = alumno
    const fechaNac = alumno.fecha_nacimiento ? new Date(alumno.fecha_nacimiento).toISOString().split('T')[0] : ''
    form.value = {
      name: alumno.name || '',
      email: alumno.email || '',
      dni: alumno.dni || '',
      telefono: alumno.telefono || '',
      fecha_nacimiento: fechaNac,
      password: '',
      password_confirmation: ''
    }
  } else {
    editMode.value = false
    alumnoEditando.value = null
    form.value = {
      name: '',
      email: '',
      dni: '',
      telefono: '',
      fecha_nacimiento: '',
      password: '',
      password_confirmation: ''
    }
  }
  modalVisible.value = true
}

const guardarAlumno = async () => {
  submitLoading.value = true
  try {
    if (editMode.value) {
      await api.put(`/centros/${centroId}/alumnos/${alumnoEditando.value.id}`, form.value)
    } else {
      await api.post(`/centros/${centroId}/alumnos`, form.value)
    }
    modalVisible.value = false
    await new Promise(resolve => setTimeout(resolve, 1000))
    await refreshAlumnos()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    submitLoading.value = false
  }
}

const eliminarAlumno = async (alumnoId) => {
  if (!confirm('¿Eliminar este alumno?')) return
  try {
    await api.delete(`/centros/${centroId.value}/alumnos/${alumnoId}`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    await refreshAlumnos()
  } catch (e) {
    console.error('Error eliminando alumno:', e)
  }
}

onMounted(() => {
  refreshAlumnos()
})
</script>

<template>
  <div>
    <div>
      <div>
        <h1>Gestionar Alumnos</h1>
        <p>
          Centro ID: {{ centroId }} |
          {{ loading ? 'Cargando...' : `${alumnos.length} alumnos` }}
        </p>
      </div>
      <button @click="abrirModal()" :disabled="loading">
        Nuevo Alumno
      </button>
    </div>

    <AlumnosList
      :alumnos="alumnos"
      :loading="loading"
      @edit="abrirModal($event)"
      @delete="eliminarAlumno($event)"
    />

    <AlumnoFormModal
      :visible="modalVisible"
      :loading="submitLoading"
      :form="form"
      :title="editMode ? 'Editar Alumno' : 'Nuevo Alumno'"
      @submit="guardarAlumno"
      @update:visible="modalVisible = $event"
    />
  </div>
</template>
