<script setup>
defineProps({
  alumno: {
    type: Object,
    required: true
  },
  guardando: Boolean
})

defineEmits(['marcarAsistencia'])
</script>

<template>
  <div>
    <div>{{ alumno.name }}</div>
    
    <div>
      <button 
        v-for="estado in ['presente','ausente','justificada','retraso']" 
        :key="estado"
        :class="['estado-btn', { active: alumno.estado === estado }]"
        @click="$emit('marcarAsistencia', alumno.id, estado)"
        :disabled="guardando"
      >
        {{ {presente:'Presente', ausente:'Ausente', justificada:'Justificada', retraso:'Retraso'}[estado] }}
      </button>
    </div>
    
    <div class="estado-actual">
      {{ alumno.estado === 'pendiente' ? 'Pendiente' : alumno.estado }}
    </div>
  </div>
</template>
