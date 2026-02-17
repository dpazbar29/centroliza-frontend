<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCursos } from '@/composables/useCursos'
import api from '@/api/auth'
import CursosList from '@/components/CursosList.vue'
import CursoFormModal from '@/components/CursoFormModal.vue'

const auth = useAuthStore()
const router = useRouter()
const { centroId, etapaId, cursos, loading, refreshCursos } = useCursos()

const modalVisible = ref(false)
const editMode = ref(false)
const form = ref({
  nombre: '',
  codigo_curso: '',
  ano_academico: new Date().getFullYear()
})

const submitLoading = ref(false)
const cursoEditando = ref(null)

const abrirModal = (curso = null) => {
  if (curso) {
    editMode.value = true
    cursoEditando.value = curso
    form.value = { ...curso }
  } else {
    editMode.value = false
    cursoEditando.value = null
    form.value = {
      nombre: '',
      codigo_curso: '',
      ano_academico: new Date().getFullYear()
    }
  }
  modalVisible.value = true
}

const guardarCurso = async () => {
  submitLoading.value = true
  try {
    if (editMode.value) {
      await api.put(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoEditando.value.id}`, form.value)
    } else {
      await api.post(`/centros/${centroId}/etapas/${etapaId}/cursos`, form.value)
    }
    modalVisible.value = false
    await refreshCursos()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    submitLoading.value = false
  }
}

const eliminarCurso = async (cursoId) => {
  if (!confirm('¿Estás seguro de eliminar este curso?')) return
  try {
    await api.delete(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}`)
    await refreshCursos()
  } catch (e) {
    console.error('Error eliminando:', e)
  }
}

onMounted(() => {
  refreshCursos()
})
</script>

<template>
  <div>
    <!-- Header -->
    <div>
      <div>
        <h1>Cursos</h1>
        <p>Etapa ID: {{ etapaId }}</p>
      </div>
      <button 
        @click="abrirModal()" 
        :disabled="loading"
      >
        Nuevo Curso
      </button>
    </div>

    <!-- Lista Cursos -->
    <CursosList  
      :cursos="cursos"
      :loading="loading"
      :centro-id="centroId"
      :etapa-id="etapaId"
      @edit="abrirModal($event)"
      @delete="eliminarCurso($event)"
    />

    <!-- Modal -->
    <CursoFormModal 
      :visible="modalVisible"
      :loading="submitLoading"
      :form="form"
      :title="editMode ? 'Editar Curso' : 'Nuevo Curso'"
      @submit="guardarCurso"
      @update:visible="modalVisible = $event"
    />
  </div>
</template>