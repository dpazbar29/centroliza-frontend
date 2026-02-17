<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAsignaturas } from '@/composables/useAsignaturas'
import api from '@/api/auth'
import AsignaturasList from '@/components/AsignaturasList.vue'
import AsignaturaFormModal from '@/components/AsignaturaFormModal.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const { centroId, etapaId, cursoId, asignaturas, loading, refreshAsignaturas } = useAsignaturas()

const modalVisible = ref(false)
const editMode = ref(false)
const form = ref({
  nombre: '',
  codigo: '',
  horas_semanales: 3,
  tipo: 'troncal'
})

const submitLoading = ref(false)
const asignaturaEditando = ref(null)

const abrirModal = (asignatura = null) => {
  if (asignatura) {
    editMode.value = true
    asignaturaEditando.value = asignatura
    form.value = { ...asignatura }
  } else {
    editMode.value = false
    asignaturaEditando.value = null
    form.value = {
      nombre: '',
      codigo: '',
      horas_semanales: 3,
      tipo: 'troncal'
    }
  }
  modalVisible.value = true
}

const guardarAsignatura = async () => {
  submitLoading.value = true
  try {
    if (editMode.value) {
      await api.put(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaEditando.value.id}`, form.value)
    } else {
      await api.post(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas`, form.value)
    }
    modalVisible.value = false
    await refreshAsignaturas()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    submitLoading.value = false
  }
}

const eliminarAsignatura = async (asignaturaId) => {
  if (!confirm('¿Estás seguro de eliminar esta asignatura?')) return
  try {
    await api.delete(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}`)
    await refreshAsignaturas()
  } catch (e) {
    console.error('Error eliminando:', e)
  }
}

onMounted(() => {
  refreshAsignaturas()
})
</script>

<template>
  <div>
    <!-- Header -->
    <div>
      <div>
        <h1>Asignaturas</h1>
        <p>Curso ID: {{ cursoId }} | Etapa ID: {{ etapaId }}</p>
      </div>
      <button 
        @click="abrirModal()" 
        :disabled="loading"
      >
        Nueva Asignatura
      </button>
    </div>

    <!-- Lista Asignaturas -->
    <AsignaturasList 
      :asignaturas="asignaturas"
      :loading="loading"
      :centro-id="centroId"
      :etapa-id="etapaId"
      :curso-id="cursoId"
      @edit="abrirModal($event)"
      @delete="eliminarAsignatura($event)"
    />

    <!-- Modal -->
    <AsignaturaFormModal 
      :visible="modalVisible"
      :loading="submitLoading"
      :form="form"
      :title="editMode ? 'Editar Asignatura' : 'Nueva Asignatura'"
      @submit="guardarAsignatura"
      @update:visible="modalVisible = $event"
    />
  </div>
</template>
