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

  <section v-else-if="user.role === 'profesor'">
    <h2>Panel de profesor</h2>
    <p>Verás tus clases, alumnos y comunicaciones.</p>
  </section>

  <section v-else>
    <h2>Panel de usuario</h2>
    <p>Podrás unirte a un centro y ver contenido.</p>
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
