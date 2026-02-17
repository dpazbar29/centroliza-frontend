<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const role = ref('alumno')
const loading = ref(false)
const error = ref(null)

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  loading.value = true
  error.value = null
  
  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      role: role.value
    })
    router.push({ name: 'dashboard' })
  } catch (e) {
    error.value = e.response?.data?.message || 'Error al crear la cuenta'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Crear cuenta</h1>
    <form @submit.prevent="submit">
      <div>
        <input v-model="name" type="text" placeholder="Nombre completo" required />
      </div>
      <div>
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Contraseña (mín. 8)" required />
      </div>
      <div>
        <input v-model="passwordConfirmation" type="password" placeholder="Confirmar contraseña" required />
      </div>
      <div>
        <select v-model="role" required>
          <option value="director">Director</option>
          <option value="profesor">Profesor</option>
          <option value="alumno">Alumno</option>
          <option value="padre">Padre</option>
        </select>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Creando...' : 'Registrarse' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p>
      ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
    </p>
  </div>
</template>
