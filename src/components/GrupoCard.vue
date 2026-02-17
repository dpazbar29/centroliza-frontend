<script setup>
const props = defineProps({
  grupo: Object,
  centroId: Number,
  etapaId: Number,
  cursoId: Number,
  asignaturaId: Number,
  profesoresCentro: Array
})
defineEmits(['edit', 'delete'])

const tutorNombre = () => {
  if (!props.grupo.profesor_tutor_id || !props.profesoresCentro?.length) {
    return 'Sin tutor'
  }
  const tutor = props.profesoresCentro.find(p => p.id === props.grupo.profesor_tutor_id)
  return tutor ? tutor.name : 'Sin tutor'
}
</script>

<template>
  <div>
    <div>
      <div>
        <h3>{{ grupo.nombre_grupo }}</h3>
        <p><strong>Tutor:</strong> {{ tutorNombre(grupo) }}</p>
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