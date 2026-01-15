<script setup>
import { provide } from 'vue';
import router from './router';
provide('$router', router);
</script>

<template>
  <router-view />
</template>
