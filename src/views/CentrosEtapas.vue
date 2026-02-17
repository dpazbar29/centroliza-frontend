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
const form = ref({
  nombre: '',
  orden: 1,
  anos_duracion: 4
})
const submitLoading = ref(false)

const crearEtapa = async () => {
  submitLoading.value = true
  try {
    await api.post(`/centros/${centroId}/etapas`, form.value)
    modalVisible.value = false
    form.value = { nombre: '', orden: etapas.value.length + 1, anos_duracion: 4 }
    await refreshEtapas()
  } catch (e) {
    console.error('Error:', e)
  } finally {
    submitLoading.value = false
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
        @click="modalVisible = true" 
        :disabled="loading"
      >
        Nueva Etapa
      </button>
    </div>

    <!-- Lista Etapas -->
    <EtapasList :etapas="etapas" :loading="loading" :centro-id="centroId">
      <template #empty-action>
        <button 
          @click="modalVisible = true"
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
      @submit="crearEtapa"
      @update:visible="modalVisible = $event"
    />
  </div>
</template>
