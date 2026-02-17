<script setup>
defineProps({
  asignatura: Object,
  centroId: Number,
  etapaId: Number,
  cursoId: Number,
  onEdit: Function,
  onDelete: Function
})
</script>

<template>
  <div>
    <div>
      <div>
        <h3>{{ asignatura.nombre }}</h3>
        <p><strong>Código:</strong> {{ asignatura.codigo || 'N/A' }}</p>
        <p><strong>Horas semanales:</strong> {{ asignatura.horas_semanales }}h</p>
        <p><strong>Tipo:</strong> 
          <span :class="`tipo-${asignatura.tipo}`">
            {{ asignatura.tipo }}
          </span>
        </p>
      </div>
      <div>
        <router-link 
          :to="`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignatura.id}/grupos`"
        >
          Grupos
        </router-link>
        <button 
          @click="$emit('edit', asignatura)"
          title="Editar"
        >
          Editar
        </button>
        <button 
          @click="$emit('delete', asignatura.id)"
          title="Eliminar"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>