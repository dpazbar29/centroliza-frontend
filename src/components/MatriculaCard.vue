<script setup>
defineProps({
  matricula: Object,
  gruposDisponibles: Array,
  onEditar: Function,
  onEliminar: Function,
  editandoId: Number,
  editForm: Object,
  onActualizar: Function,
  onCancelarEdicion: Function
})

const emit = defineEmits(['editar', 'eliminar'])
</script>

<template>
  <div>
    <div v-if="editandoId !== matricula.id">
      <h3>{{ matricula.alumno?.name || 'Sin alumno' }}</h3>
      
      <p><strong>Asignatura:</strong> {{ matricula.grupo?.asignatura?.nombre }}</p>
      <p><strong>Grupo:</strong> {{ matricula.grupo?.nombre_grupo }}</p>
      <p><strong>Tutor:</strong> {{ matricula.tutor?.name || 'Sin tutor' }}</p>
      
      <p>
        <strong>Estado:</strong> 
        <span :class="['estado-badge', 'estado-' + matricula.estado]">
          {{ matricula.estado }}
        </span>
      </p>
      
      <small>Matriculado: {{ matricula.fecha_matricula }}</small>
    </div>

    <!-- Edición inline -->
    <div v-else>
      <div>
        <select v-model="editForm.grupo_id">
          <option value="">Grupo actual</option>
          <option v-for="grupo in gruposDisponibles" :key="grupo.id" :value="grupo.id">
            {{ grupo.asignatura_nombre }} - {{ grupo.nombre_grupo }}
          </option>
        </select>
        
        <select v-model="editForm.estado">
          <option value="activa">Activa</option>
          <option value="suspendida">Suspendida</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      
      <div>
        <button @click="$emit('actualizar')" 
          :disabled="!editForm.grupo_id && editForm.estado === matricula.estado">
          Guardar
        </button>
        <button @click="$emit('cancelar')">
          Cancelar
        </button>
      </div>
    </div>

    <div v-if="editandoId !== matricula.id">
      <button @click="$emit('editar', matricula)" title="Editar">
        Editar
      </button>
      <button @click="$emit('eliminar', matricula.id)" title="Eliminar">
        Eliminar
      </button>
    </div>
  </div>
</template>
