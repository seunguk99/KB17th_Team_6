<template>
  <div class="container py-5">
    <h2 class="mb-4">프로필 수정</h2>

    <form class="card p-4" @submit.prevent="saveChange">
      <div class="mb-3">
        <label for="name" class="form-label"
          >이름<span class="text-danger">*</span></label
        >
        <input
          v-model="editUser.name"
          type="text"
          id="name"
          class="form-control"
          required
        />

        <label for="email" class="form-label"
          >이메일<span class="text-danger">*</span></label
        >
        <input
          v-model="editUser.email"
          type="email"
          id="email"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">저장</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const editUser = ref({
  name: '',
  email: '',
});

onMounted(() => {
  if (userStore.currentUser) {
    editUser.value = { ...userStore.currentUser };
  }
});

const saveChange = async () => {
  await userStore.updateUser(editUser.value);
  router.push({ name: 'profilePage' });
};
</script>
