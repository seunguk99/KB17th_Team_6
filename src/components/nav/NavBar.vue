<script setup>
import MenuGroup from './MenuGroup.vue';

const navMenus = [
  { name: 'homePage' },
  { name: 'transactionHistory' },
  { name: 'transactionWritePage' },
];
</script>

<template>
  <nav class="navbar bg-light border-end py-2 px-4">
    <div class="container-fluid">
      <MenuGroup :items="navMenus" />
    </div>
  </nav>
</template>
