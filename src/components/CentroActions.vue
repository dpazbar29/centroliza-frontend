<script setup>
    import { computed } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useRoute } from 'vue-router'

    const auth = useAuthStore()
    const route = useRoute()

    const centroId = computed(() => {
    return auth.user?.centro_id || route.params?.centro
    })
</script>

<template>
  <div class="acciones space-y-2">
    <router-link :to="`/centros/${centroId}/etapas`">
      Gestionar Etapa
    </router-link>
    <router-link :to="`/centros/${centroId}/profesores`">
      Gestionar Profesores
    </router-link>
    <router-link :to="`/centros/${centroId}/alumnos`">
      Gestionar Alumnos
    </router-link>
    <router-link :to="`/centros/${centroId}/avisos`">
      Avisos
    </router-link>
  </div>
</template>
