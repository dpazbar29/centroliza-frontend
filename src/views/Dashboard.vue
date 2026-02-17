<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/auth'
import CentroModal from '@/components/CentroModal.vue'
import DashboardSection from '@/components/DashboardSection.vue'

const auth = useAuthStore()
const showModal = ref(false)
const loading = ref(false)
const error = ref(null)

const hasCentro = computed(() => auth.user?.centro_id > 0)

const handleCentroCreated = async () => {
  await auth.fetchMe()
  showModal.value = false
}

onMounted(() => {
  auth.fetchMe()
})
</script>

<template>
  <div>
    <h1>Panel de {{ auth.role }}</h1>
    
    <p v-if="!auth.user">Cargando...</p>
    
    <DashboardSection 
      v-else
      :user="auth.user"
      :has-centro="hasCentro"
      @create-centro="showModal = true"
    />
    
    <CentroModal 
      :visible="showModal"
      :loading="loading"
      :error="error"
      @update:visible="showModal = $event"
      @create="handleCentroCreated"
    />
  </div>
</template>
