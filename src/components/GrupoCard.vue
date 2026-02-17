<script setup>
defineProps({
  grupo: Object,
  centroId: Number,
  etapaId: Number,
  cursoId: Number,
  asignaturaId: Number
})
defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <div>
      <div>
        <h3>{{ grupo.nombre_grupo }}</h3>
        <p><strong>Tutor:</strong> {{ grupo.profesor_tutor_id || 'Sin tutor' }}</p>
        <p><strong>Capacidad:</strong> {{ grupo.capacidad_maxima }} alumnos</p>
      </div>
      <div>
        <router-link 
          :to="`/centros/${centroId}/etapas/${etapaId}/cursos/${cursoId}/asignaturas/${asignaturaId}/grupos/${grupo.id}/asistencias`"
        >
          Asistencias
        </router-link>
        <button @click="$emit('edit', grupo)">Editar</button>
        <button @click="$emit('delete', grupo.id)">Eliminar</button>
      </div>
    </div>
  </div>
</template>