<template>
  <div class="container">
    <form @submit.prevent="updateTransaction">
      <div class="form-group">
        <label>거래 유형</label>
        <div class="radio-group">
          <div class="radio-item">
            <input
              type="radio"
              id="income"
              value="income"
              v-model="transaction.type"
            />
            <label for="income">수입</label>
          </div>
          <div class="radio-item">
            <input
              type="radio"
              id="expense"
              value="expense"
              v-model="transaction.type"
            />
            <label for="expense">지출</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="date">날짜</label>
        <input type="date" id="date" v-model="transaction.date" />
      </div>

      <div class="form-group">
        <label for="name">거래 이름</label>
        <input type="text" id="name" v-model="transaction.name" />
      </div>

      <div class="form-group">
        <label for="amount">금액</label>
        <input type="number" id="amount" v-model="transaction.amount" />
      </div>

      <div class="form-group">
        <label for="memo">메모</label>
        <textarea id="memo" v-model="transaction.memo"></textarea>
      </div>

      <div class="form-group">
        <label for="category">카테고리</label>
        <select id="category" v-model="transaction.category">
          <option value="" disabled>카테고리를 선택하세요</option>
          <option
            v-for="category in allCategories"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="button-group">
        <button type="submit" class="btn">수정</button>
        <button type="button" class="btn btn-cancel" @click="cancel">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const transaction = ref({
  type: 'expense',
  date: '',
  name: '',
  amount: '',
  memo: '',
  category: '',
});

const users = ref([]);
const incomeCategories = ref([]);
const expenseCategories = ref([]);

const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/users');
    users.value = res.data;
  } catch (error) {
    console.error('사용자 데이터를 불러오는 중 오류 발생:', error);
  }
};

const fetchTransaction = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/transactions/${route.params.id}`
    );
    transaction.value = res.data;

    const user = users.value.find(
      (user) => user.id === transaction.value.userId
    );
    if (user) {
      transaction.value.name = user.name;
    }
  } catch (error) {
    console.error('거래 데이터를 불러오는 중 오류 발생:', error);
  }
};

const fetchCategories = async () => {
  try {
    const [incomeRes, expenseRes] = await Promise.all([
      axios.get('http://localhost:3000/incomeCategory'),
      axios.get('http://localhost:3000/expenseCategory'),
    ]);
    incomeCategories.value = incomeRes.data;
    expenseCategories.value = expenseRes.data;
  } catch (error) {
    console.error('카테고리 데이터를 불러오는 중 오류 발생:', error);
  }
};

onMounted(async () => {
  await fetchUsers();
  await fetchCategories();
  await fetchTransaction();
});

const allCategories = computed(() => [
  ...incomeCategories.value,
  ...expenseCategories.value,
]);

const updateTransaction = async () => {
  try {
    await axios.put(
      `http://localhost:3000/transactions/${route.params.id}`,
      transaction.value
    );
    alert('거래 내역이 성공적으로 수정되었습니다.');
    router.back(); // 이전 페이지로 돌아가기
  } catch (error) {
    console.error('거래 내역 수정 중 오류 발생:', error);
    alert('거래 내역 수정에 실패했습니다.');
  }
};

const cancel = () => {
  router.back();
};
</script>

<style scoped></style>
