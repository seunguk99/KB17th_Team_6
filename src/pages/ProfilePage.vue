<template>
  <div class="container py-5">
    <h2 class="mb-4">설정 및 프로필</h2>

    <div class="card p-4">
      <h4>{{ user.name }}</h4>
      <p>{{ user.email }}</p>

      <div class="d-flex gap-2 mt-4">
        <router-link class="btn btn-outline-primary" to="/profile/edit"
          >프로필 수정</router-link
        >
        <button class="btn btn-outline-danger" @click="logout">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push({ name: 'userSelection' });
};

const user = computed(() => userStore.currentUser || {});
</script>
