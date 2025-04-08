<template>
  <ul class="navbar-nav flex-row justify-content-around w-100">
    <li class="nav-item" v-for="item in items" :key="item.name">
      <MenuItem :name="item.name" />
    </li>
  </ul>
</template>

<script setup>
import MenuItem from './MenuItem.vue';

defineProps({
  items: Array,
});
</script>
