<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAvisosCentro } from '@/composables/useAvisosCentro'

const route = useRoute()
const centroId = route.params.centro
const { avisos, loading, currentPage, cargarAvisos, crearAviso, actualizarAviso, eliminarAviso } = useAvisosCentro(centroId)

const mostrarModal = ref(false)
const editandoAviso = ref(null)
const formData = reactive({
  titulo: '',
  contenido: '',
  tipo: 'general',
  fecha_publicacion: new Date().toISOString().split('T')[0],
  fecha_expiracion: '',
  visible: true
})

const abrirModal = (aviso = null) => {
  if (aviso) {
    editandoAviso.value = aviso.id
    Object.assign(formData, aviso)
  } else {
    editandoAviso.value = null
    Object.assign(formData, {
      titulo: '',
      contenido: '',
      tipo: 'general',
      fecha_publicacion: new Date().toISOString().split('T')[0],
      fecha_expiracion: '',
      visible: true
    })
  }
  mostrarModal.value = true
}

const guardarAviso = async () => {
  try {
    if (editandoAviso.value) {
      await actualizarAviso(editandoAviso.value, formData)
    } else {
      await crearAviso(formData)
    }
    mostrarModal.value = false
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(() => cargarAvisos())
</script>

<template>
  <div>
    <div>
      <h1>Avisos del Centro</h1>
      <button @click="abrirModal()">
        Nuevo Aviso
      </button>
    </div>

    <div v-if="loading">Cargando avisos...</div>
    
    <div v-else-if="avisos.length">
      <div 
        v-for="aviso in avisos" 
        :key="aviso.id" 
      >
        <div>
          <h3>{{ aviso.titulo }}</h3>
          <div>
            <span>
              {{ aviso.visible ? 'Visible' : 'Oculto' }}
            </span>
            <span>{{ aviso.fecha_publicacion }}</span>
          </div>
        </div>
        
        <p>{{ aviso.contenido }}</p>
        
        <div>
          <span>{{ {general:'General', profesores:'Profesores', alumnos:'Alumnos', familias:'Familias', urgente:'Urgente'}[aviso.tipo] }}</span>
          <span v-if="aviso.fecha_expiracion">Exp: {{ aviso.fecha_expiracion }}</span>
        </div>
        
        <div>
          <button @click="abrirModal(aviso)">Editar</button>
          <button @click="eliminarAviso(aviso.id)">Eliminar</button>
        </div>
      </div>

      <div>
        <button 
          v-if="currentPage > 1" 
          @click="cargarAvisos(currentPage - 1)"
        >Anterior</button>
        <span>{{ currentPage }}</span>
        <button 
          @click="cargarAvisos(currentPage + 1)"
          :disabled="!avisos.length"
        >Siguiente</button>
      </div>
    </div>

    <div v-else>
      <p>No hay avisos</p>
      <button @click="abrirModal()">
        Ser el primero
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="mostrarModal" @click.self="mostrarModal = false">
      <div>
        <h2>
          {{ editandoAviso ? 'Editar Aviso' : 'Nuevo Aviso' }}
        </h2>
        
        <form @submit.prevent="guardarAviso">
          <div>
            <label>Título:</label>
            <input v-model="formData.titulo" type="text" maxlength="100" required>
          </div>
          
          <div>
            <label>Contenido:</label>
            <textarea v-model="formData.contenido" rows="6" maxlength="2000" required></textarea>
          </div>
          
          <div>
            <div>
              <label>Tipo:</label>
              <select v-model="formData.tipo">
                <option value="general">General</option>
                <option value="profesores">Profesores</option>
                <option value="alumnos">Alumnos</option>
                <option value="familias">Familias</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
            
            <div>
              <label>Visible:</label>
              <label>
                <input v-model="formData.visible" type="checkbox">
                <span>Mostrar aviso</span>
              </label>
            </div>
          </div>
          
          <div>
            <div>
              <label>Publicación:</label>
              <input v-model="formData.fecha_publicacion" type="date">
            </div>
            <div>
              <label>Expiración:</label>
              <input v-model="formData.fecha_expiracion" type="date">
            </div>
          </div>
          
          <div>
            <button type="button" @click="mostrarModal = false" >
              Cancelar
            </button>
            <button type="submit">
              {{ editandoAviso ? 'Actualizar' : 'Publicar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
