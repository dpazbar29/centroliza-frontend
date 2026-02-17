<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useEtapas } from '@/composables/useEtapas'
import EtapasList from '@/components/EtapasList.vue'
import EtapaFormModal from '@/components/EtapaFormModal.vue'
import api from '@/api/auth' 

const auth = useAuthStore()
const router = useRouter()
const { centroId, etapas, loading, refreshEtapas } = useEtapas()

const modalVisible = ref(false)
const editMode = ref(false)
const form = ref({
  nombre: '',
  orden: 1,
  anos_duracion: 4
})
const submitLoading = ref(false)
const etapaEditando = ref(null)

const abrirModal = (etapa = null) => {
  if (etapa) {
    editMode.value = true
    etapaEditando.value = etapa
    form.value = { ...etapa }
  } else {
    editMode.value = false
    etapaEditando.value = null
    form.value = {
      nombre: '',
      orden: etapas.value.length + 1,
      anos_duracion: 4
    }
  }
  modalVisible.value = true
}

const crearEtapa = async () => {
  submitLoading.value = true
  try {
    if (editMode.value) {
      await api.put(`/centros/${centroId}/etapas/${etapaEditando.value.id}`, form.value)
    } else {
      await api.post(`/centros/${centroId}/etapas`, form.value)
    }
    modalVisible.value = false
    await refreshEtapas()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    submitLoading.value = false
  }
}

const eliminarEtapa = async (etapaId) => {
  if (!confirm('¿Estás seguro de eliminar esta etapa?')) return
  
  try {
    await api.delete(`/centros/${centroId}/etapas/${etapaId}`)
    await refreshEtapas()
  } catch (e) {
    console.error('Error eliminando:', e)
  }
}

onMounted(() => {
  refreshEtapas()
})
</script>

<template>
  <div>
    <!-- Header -->
    <div>
      <h1>Etapas Educativas</h1>
      <button 
        @click="abrirModal()" 
        :disabled="loading"
      >
        Nueva Etapa
      </button>
    </div>

    <!-- Lista Etapas -->
    <EtapasList
      :etapas="etapas"
      :loading="loading"
      :centro-id="centroId"
      @edit="abrirModal($event)"      
      @delete="eliminarEtapa($event)"
    > 
      <template #empty-action>
        <button 
          @click="abrirModal()"
        >
          Crear la primera etapa
        </button>
      </template>
    </EtapasList>

    <!-- Modal -->
    <EtapaFormModal 
      :visible="modalVisible"
      :loading="submitLoading"
      :form="form"
      :title="editMode ? 'Editar Etapa' : 'Nueva Etapa'"
      @submit="crearEtapa"
      @update:visible="modalVisible = $event"
    />
  </div>
</template>
