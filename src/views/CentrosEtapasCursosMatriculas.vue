<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMatriculasCurso } from '@/composables/useMatriculasCurso'
import { useGruposCurso } from '@/composables/useGruposCurso'
import { useAlumnosCentroCompleto } from '@/composables/useAlumnosCentroCompleto'
import MatriculasList from '@/components/MatriculasList.vue'
import MatriculaFormModal from '@/components/MatriculaFormModal.vue'
import api from '@/api/auth'

const route = useRoute()
const auth = useAuthStore()
const centroId = computed(() => auth.user?.centro_id || route.params.centro)

const { matriculas, loading: loadingMatriculas, refreshMatriculas } = useMatriculasCurso()
const { grupos, loading: loadingGrupos, refreshGrupos } = useGruposCurso()
const { alumnos, loading: loadingAlumnos, refreshAlumnos } = useAlumnosCentroCompleto()

const modalVisible = ref(false)
const form = ref({ alumno_id: '', grupo_id: '' })
const submitLoading = ref(false)

const editandoId = ref(null)
const editForm = ref({ grupo_id: '', estado: '' })

const loading = computed(() => loadingMatriculas.value || loadingGrupos.value || loadingAlumnos.value)
const matriculasActivas = computed(() => matriculas.value.filter(m => m.estado === 'activa'))
const gruposDisponibles = computed(() => grupos.value.filter(g => g.capacidad_maxima > 0))

const abrirModal = () => { form.value = { alumno_id: '', grupo_id: '' }; modalVisible.value = true }
const guardarMatricula = async () => {
  submitLoading.value = true
  try {
    await api.post(`/centros/${centroId.value}/etapas/${route.params.etapa}/cursos/${route.params.curso}/matriculas`, form.value)
    modalVisible.value = false
    await refreshMatriculas()
    await refreshGrupos()
  } catch (error) { console.error('Error guardando:', error) } finally { submitLoading.value = false }
}
const eliminarMatricula = async (id) => {
  if (!confirm('¿Eliminar esta matrícula?')) return
  try {
    await api.delete(`/centros/${centroId.value}/etapas/${route.params.etapa}/cursos/${route.params.curso}/matriculas/${id}`)
    await refreshMatriculas()
  } catch (error) { console.error('Error eliminando:', error) }
}
const editarMatricula = (matricula) => {
  editandoId.value = matricula.id
  editForm.value = { grupo_id: matricula.grupo_id || '', estado: matricula.estado || 'activa' }
}
const cancelarEdicion = () => { editandoId.value = null; editForm.value = { grupo_id: '', estado: '' } }
const actualizarMatricula = async () => {
  if (editandoId.value) {
    try {
      await api.put(`/centros/${centroId.value}/etapas/${route.params.etapa}/cursos/${route.params.curso}/matriculas/${editandoId.value}`, editForm.value)
      await refreshMatriculas()
      cancelarEdicion()
    } catch (error) { console.error('Error actualizando:', error) }
  }
}

onMounted(async () => {
  await Promise.all([refreshMatriculas(), refreshGrupos(), refreshAlumnos()])
})
</script>

<template>
  <div>
    <div>
      <div>
        <h1>Matrículas - {{ route.params.curso }}</h1>
        <p>
          Etapa: {{ route.params.etapa }} | Centro: {{ centroId }} | 
          {{ loading ? 'Cargando...' : `${matriculasActivas.length} matriculados` }}
        </p>
      </div>
      <button @click="abrirModal" :disabled="loading || !gruposDisponibles.length">
        Nueva Matrícula
      </button>
    </div>

    <div v-if="loading">Cargando matrículas...</div>

    <MatriculasList
      :matriculas="matriculas"
      :grupos-disponibles="gruposDisponibles"
      :loading="loading"
      :editando-id="editandoId"
      :edit-form="editForm"
      @editar="editarMatricula"
      @eliminar="eliminarMatricula"
      @actualizar="actualizarMatricula"
      @cancelar="cancelarEdicion"
    >
      <template #empty-action>
        <button @click="abrirModal" :disabled="!gruposDisponibles.length">
          Crear primera matrícula
        </button>
      </template>
    </MatriculasList>

    <MatriculaFormModal 
      :visible="modalVisible"
      :loading="submitLoading"
      :form="form"
      @submit="guardarMatricula"
      @update:visible="modalVisible = $event"
    >
      <template #alumnos-select>
        <select v-model="form.alumno_id" required>
          <option value="">Seleccionar alumno</option>
          <option v-for="alumno in alumnos" :key="alumno.id" :value="alumno.id">
            {{ alumno.name }} ({{ alumno.email }})
          </option>
        </select>
      </template>
      <template #grupos-select>
        <select v-model="form.grupo_id" required>
          <option value="">Seleccionar grupo</option>
          <option v-for="grupo in gruposDisponibles" :key="grupo.id" :value="grupo.id">
            {{ grupo.asignatura_nombre }} - {{ grupo.nombre_grupo }}
          </option>
        </select>
      </template>
    </MatriculaFormModal>
  </div>
</template>