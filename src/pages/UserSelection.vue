<template>
  <div class="container py-5">
    <h2 class="text-center mb-4">사용자를 선택해주세요</h2>

    <div class="row justify-content-center">
      <div v-for="user in users" :key="user.id" class="col-md-3 mb-3">
        <button
          class="btn"
          :class="
            selectedUser?.id === user.id ? 'btn-primary' : 'btn-outline-primary'
          "
          @click="selectedUser = user"
        >
          {{ user.name }}
        </button>
      </div>
    </div>

    <div class="text-center mt-4">
      <button class="btn btn-success" :disabled="!selectedUser" @click="login">
        로그인
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const selectedUser = ref(null);

const users = computed(() => userStore.userList);

const login = () => {
  if (selectedUser.value) {
    userStore.currentUser = selectedUser.value;
    router.push({ name: 'homePage' });
  }
};

onMounted(() => {
  userStore.fetchUsers();
});
</script>
