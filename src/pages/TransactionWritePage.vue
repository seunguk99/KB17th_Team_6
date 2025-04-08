<template>
  <div class="container">
    <h1 class="title">거래 내역 등록</h1>
    <form @submit.prevent="submitTransaction">
      <div class="form">
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

      <div class="form">
        <label for="date">날짜</label>
        <input type="date" id="date" v-model="transaction.date" />
      </div>

      <div class="form">
        <label for="name">거래 이름</label>
        <input type="text" id="name" v-model="transaction.name" />
      </div>

      <div class="form">
        <label for="amount">금액</label>
        <input type="number" id="amount" v-model="transaction.amount" />
      </div>

      <div class="form">
        <label for="memo">메모</label>
        <textarea id="memo" v-model="transaction.memo"></textarea>
      </div>

      <div class="form">
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
        <button type="submit" class="btn">저장</button>
        <button type="button" class="btn btn-cancel" @click="cancel">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const transaction = ref({
  type: 'expense',
  date: '',
  name: '',
  amount: '',
  memo: '',
  category: '',
});

const incomeCategories = ref([]);
const expenseCategories = ref([]);
// 이부분은 transacrion Store.js완성시 대체
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

onMounted(fetchCategories);

const allCategories = computed(() => [
  ...incomeCategories.value,
  ...expenseCategories.value,
]);

const submitTransaction = async () => {
  try {
    await axios.post('http://localhost:3000/transactions', transaction.value);
    alert('거래 내역이 등록되었습니다.');
    router.back();
  } catch (error) {
    console.error('거래 내역 저장 중 오류 발생:', error);
    alert('거래 내역 저장에 실패했습니다.');
  }
};

const cancel = () => {
  router.back();
};
</script>

<style scoped>
/* 추가 예정 */
</style>
