<script setup>
defineProps({
  user: Object,
  hasCentro: Boolean
})

defineEmits(['create-centro'])
</script>

<template>
  <section :class="sectionClass" v-if="user.role === 'director'">
    <div v-if="!hasCentro">
      <h2>Crea tu centro educativo</h2>
      <p>Para gestionar tu centro, primero debes crearlo.</p>
      <button @click="$emit('create-centro')">Crear Centro</button>
    </div>
    <div v-else>
      <h2>Centro creado</h2>
      <p>Tu centro está listo para gestionar etapas, cursos, etc.</p>
      <router-link to="/centros">Gestionar Centro</router-link>
    </div>
  </section>

  <section v-else-if="user.role === 'profesor'" :class="sectionClass">
    <div v-if="!hasCentro">
      <h2>Únete a un centro</h2>
      <p>Introduce el ID del centro que te ha proporcionado el director.</p>
      <router-link to="/unirse-centro">Unirme por ID</router-link>
    </div>
    <div v-else>
      <h2>Ya estás en un centro</h2>
      <p>Verás tus clases, alumnos y comunicaciones.</p>
      <router-link to="/centros">Ir al Centro</router-link>
    </div>
  </section>

  <section v-else :class="sectionClass">
    <div v-if="!hasCentro">
      <h2>Únete a un centro</h2>
      <p>Introduce el ID del centro para ver el contenido.</p>
      <router-link to="/unirse-centro">Unirme por ID</router-link>
    </div>
    <div v-else>
      <h2>Ya estás en un centro</h2>
      <p>Podrás ver el contenido del centro.</p>
      <router-link to="/centros">Ir al Centro</router-link>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    sectionClass() {
      return this.user.role === 'director' ? 'director-section' : `${this.user.role}-section`
    }
  }
}
</script>
