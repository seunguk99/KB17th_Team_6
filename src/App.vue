<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DefaultLayout from './components/layout/DefaultLayout.vue';
import Header from './components/layout/Header.vue';
import NavBar from './components/nav/NavBar.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped></style>
