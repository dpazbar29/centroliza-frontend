<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authAPI } from '@/api/auth.js';

const router = useRouter();
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'padre',
  dni: ''
});

const register = async () => {
  try {
    await authAPI.register(form.value);
    router.push('/login');
  } catch (error) {
    alert(error.response?.data?.message || 'Error registro');
  }
};
</script>

<template>
  <div>
    <h2>Crear Cuenta</h2>
    <form @submit.prevent="register">
      <input v-model="form.name" placeholder="Nombre" required /><br/>
      <input v-model="form.email" type="email" placeholder="Email" required /><br/>
      <input v-model="form.password" type="password" placeholder="Contraseña" required /><br/>
      <input v-model="form.password_confirmation" type="password" placeholder="Confirmar" required /><br/>
      <input v-model="form.dni" placeholder="DNI (12345678Z)" required /><br/>
      <select v-model="form.role">
        <option value="director">Director</option>
        <option value="profesor">Profesor</option>
        <option value="padre">Padre</option>
        <option value="alumno">Alumno</option>
      </select><br/>
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>
