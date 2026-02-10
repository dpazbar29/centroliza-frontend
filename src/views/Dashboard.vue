<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const crearCentro = () => {
  console.log('Crear centro (pendiente de implementar)')
}
</script>

<template>
  <div>
    <h1>Panel</h1>

    <p v-if="!auth.user">Cargando datos de usuario...</p>

    <template v-else>
      <section v-if="auth.role === 'director'">
        <h2>Panel de dirección</h2>
        <p>Aquí podrás crear y gestionar tu centro.</p>
        <button @click="crearCentro">Crear centro</button>
      </section>

      <section v-else-if="auth.role === 'profesor'">
        <h2>Panel de profesor</h2>
        <p>Verás tus clases, alumnos y comunicaciones.</p>
      </section>

      <section v-else>
        <h2>Panel de usuario</h2>
        <p>
          Podrás unirte a un centro y ver el contenido que publiquen
          directivos y profesores.
        </p>
      </section>
    </template>
  </div>
</template>