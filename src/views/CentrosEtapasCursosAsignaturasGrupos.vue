<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useGrupos } from '@/composables/useGrupos'
import api from '@/api/auth'
import GruposList from '@/components/GruposList.vue'
import GrupoFormModal from '@/components/GrupoFormModal.vue'

const route = useRoute()
const auth = useAuthStore()
const { 
  centroId, etapaId, cursoId, asignaturaId, 
  grupos, loading, refreshGrupos 
} = useGrupos()

const modalVisible = ref(false)
const editMode = ref(false)
const form = ref({
  nombre_grupo: '',
  profesor_tutor_id: null,
  capacidad_maxima: 30,
})

const submitLoading = ref(false)
const grupoEditando = ref(null)

const abrirModal = (grupo = null) => {
  if (grupo) {
    editMode.value = true
    grupoEditando.value = grupo
    form.value = { ...grupo }
  } else {
    editMode.value = false
    grupoEditando.value = null
    form.value = {
      nombre_grupo: '',
      profesor_tutor_id: null,
      capacidad_maxima: 30,
    }
  }
  modalVisible.value = true
}

const guardarGrupo = async () => {
  submitLoading.value = true
  try {
    if (editMode.value) {
      await api.put(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/grupos/${grupoEditando.value.id}`, form.value)
    } else {
      await api.post(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/grupos`, form.value)
    }
    modalVisible.value = false
    await refreshGrupos()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    submitLoading.value = false
  }
}

const eliminarGrupo = async (grupoId) => {
  if (!confirm('¿Estás seguro de eliminar este grupo?')) return
  try {
    await api.delete(`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/grupos/${grupoId}`)
    await refreshGrupos()
  } catch (e) {
    console.error('Error eliminando:', e)
  }
}

onMounted(() => {
  refreshGrupos()
})
</script>

<template>
  <div>
    <!-- Header -->
    <div>
      <div>
        <h1>Grupos</h1>
        <p>Asignatura ID: {{ asignaturaId }} | Curso: {{ cursoId }}</p>
      </div>
      <button @click="abrirModal()" :disabled="loading">
        Nuevo Grupo
      </button>
    </div>

    <!-- Lista Grupos -->
    <GruposList 
      :grupos="grupos"
      :loading="loading"
      :centro-id="centroId"
      :etapa-id="etapaId"
      :curso-id="cursoId"
      :asignatura-id="asignaturaId"
      @edit="abrirModal($event)"
      @delete="eliminarGrupo($event)"
    />

    <!-- Modal -->
    <GrupoFormModal 
      :visible="modalVisible"
      :loading="submitLoading"
      :form="form"
      :title="editMode ? 'Editar Grupo' : 'Nuevo Grupo'"
      @submit="guardarGrupo"
      @update:visible="modalVisible = $event"
    />
  </div>
</template>
