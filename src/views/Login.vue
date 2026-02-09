<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  loading.value = true
  error.value = null
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push({ name: 'dashboard' })
  } catch (e) {
    error.value = 'Credenciales incorrectas o error de servidor'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit" :disabled="loading">Entrar</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>