<template>
  <div class="p-5 bg-primary text-white">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-8">
          <h1 class="m-0">{{ pageTitle }}</h1>
        </div>

        <div class="col-4 text-end">
          <div class="d-flex align-items-center justify-content-end gap-3">
            <p class="m-0" v-if="userStore.isLoggedIn">
              안녕하세요, <strong>{{ userStore.userName }}</strong
              >님!
            </p>

            <router-link
              to="/profile"
              class="text-dark"
              v-if="userStore.isLoggedIn"
              title="프로필 설정"
              ><i class="fa-solid fa-gear"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const userStore = useUserStore();

const pageTitle = computed(() => route.meta.title || 'KB 6팀 가계부');
</script>
