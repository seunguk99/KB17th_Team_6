<script setup>
import { RouterLink, RouterView } from 'vue-router';
import DefaultLayout from './components/layout/DefaultLayout.vue';
// import Header from './components/layout/Header.vue';
// import NavBar from './components/layout/NavBar.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <DefaultLayout>
    <!-- <template v-slot:header><Header /></template> -->
    <!-- <template v-slot:navbar><NavBar /></template> -->
    <template v-slot:default><RouterView /></template>
    <template v-slot:footer><Footer /></template>
  </DefaultLayout>
</template>

<style scoped></style>
