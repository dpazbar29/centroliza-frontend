<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authAPI } from '@/api/auth.js';

const router = useRouter();
const form = ref({
  email: '',
  password: ''
});

const login = async () => {
  try {
    await authAPI.login(form.value);
    router.push('/dashboard');
  } catch (error) {
    console.error('Error:', error.response?.data);
    alert(error.response?.data?.message || 'Error login');
  }
};
</script>

<template>
  <div>
    <h2>CentroLiza Login</h2>
    <form @submit.prevent="login">
      <input 
        v-model="form.email"
        type="email" 
        placeholder="director@centroliza.es"
        required
      /><br/>
      <input 
        v-model="form.password"
        type="password" 
        placeholder="12345678"
        required
      /><br/>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>
