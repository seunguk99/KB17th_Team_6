// UserStore.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const USERS_API_PATH = '/api/users';

  // state
  const userList = ref([]);
  // const currentUser = ref(null);
  const currentUser = ref(
    JSON.parse(sessionStorage.getItem('currentUser') || null)
  );

  // getter
  // const isLoggedIn = computed(() => !!currentUser?.value);
  const isLoggedIn = computed(() => !!currentUser.value);
  const userName = computed(() => currentUser.value?.name || '');
  const userEmail = computed(() => currentUser.value?.email || '');

  // action
  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS_API_PATH);
      userList.value = response.data;
    } catch (error) {
      console.error('유저 목록을 불러오는데 실패하였습니다.');
      console.log(test);
    }
  };
  const updateUser = async (updateUser) => {
    try {
      const response = await axios.put(
        USERS_API_PATH + `/${updatedUser.id}`,
        updatedUser
      );
      currentUser.value = response.data;

      const idx = userList.value.findIndex((user) => user.id === updateUser.id);
      if (idx !== -1) userList.value[idx] = response.data;
    } catch (error) {
      console.error('유저 정보 수정 실패:', error);
    }
  };
  const logout = () => {
    sessionStorage.removeItem('currentUser');
    currentUser.value = null;
  };

  return {
    // state
    userList,
    currentUser,
    // getters
    isLoggedIn,
    userName,
    userEmail,
    // actions
    fetchUsers,
    updateUser,
    logout,
  };
});
