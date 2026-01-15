<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authAPI } from '@/api/auth.js';

const router = useRouter();

onMounted(async () => {
  //Auto redirect si ya logueado
  try {
    await authAPI.me();
    router.push('/dashboard');
  } catch {
    // No logueado → Quedar en Home
  }
});
</script>

<template>
  <div>
    <header>
      <h1>CentroLiza</h1>
      <p>Sistema de gestión educativa</p>
    </header>

    <main>
      <!-- Hero -->
      <section>
        <h2>
          Bienvenido a CentroLiza
        </h2>
        <p>
          Plataforma para directores, profesores, alumnos y padres
        </p>
        
        <div>
          <router-link 
            to="/login" 
          >
            Iniciar Sesión
          </router-link>
          
          <router-link 
            to="/register" 
          >
            Crear Cuenta
          </router-link>
        </div>
      </section>

      <!-- Features -->
      <section>
        <div>
          <h3>Directores</h3>
          <p>Gestión completa del centro educativo</p>
        </div>
        <div>
          <h3>Profesores</h3>
          <p>Control de alumnos y calificaciones</p>
        </div>
        <div>
          <h3>Padres/Alumnos</h3>
          <p>Consulta de notas y comunicaciones</p>
        </div>
      </section>
    </main>
  </div>
</template>
