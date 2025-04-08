<template>
  <router-link
    :to="{ name }"
    class="nav-link d-flex align-items-center gap-2 px-3 py-2"
    active-class="fw-bold text-dark"
  >
    <span>{{ pageTitle }}</span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  name: String,
});

const router = useRouter();
const pageTitle = computed(() => {
  const route = router.getRoutes().find((r) => r.name === props.name);
  return route?.meta?.title || '';
});
</script>
