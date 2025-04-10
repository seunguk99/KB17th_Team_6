<template>
  <div class="container mt-4">
    <form @submit.prevent="updateTransaction">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th class="text-center">거래 유형</th>
            <td>
              <div class="radio-group d-flex">
                <div class="form-check me-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="income"
                    value="income"
                    v-model="transaction.type"
                  />
                  <label class="form-check-label" for="income">수입</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="expense"
                    value="expense"
                    v-model="transaction.type"
                  />
                  <label class="form-check-label" for="expense">지출</label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th class="text-center">날짜</th>
            <td>
              <input
                type="date"
                class="form-control"
                v-model="transaction.date"
              />
            </td>
          </tr>
          <tr>
            <th class="text-center">거래 이름</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="transaction.name"
              />
            </td>
          </tr>
          <tr>
            <th class="text-center">금액</th>
            <td>
              <input
                type="number"
                class="form-control"
                v-model="transaction.amount"
              />
            </td>
          </tr>
          <tr>
            <th class="text-center">메모</th>
            <td>
              <textarea
                class="form-control"
                v-model="transaction.memo"
              ></textarea>
            </td>
          </tr>
          <tr>
            <th class="text-center">카테고리</th>
            <td>
              <select class="form-control" v-model="transaction.category">
                <option value="" disabled>카테고리를 선택하세요</option>
                <option
                  v-for="category in allCategories"
                  :key="category.id"
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center my-4">
        <button type="submit" class="save-button me-2">저장</button>
        <button type="button" class="cancel-button" @click="cancel">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTransactionStore } from '@/stores/transactionStore';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const transactionStore = useTransactionStore();
const userStore = useUserStore();

const transaction = ref({
  type: 'expense',
  date: '',
  name: '',
  amount: '',
  memo: '',
  category: '',
  userId: null,
});

const incomeCategories = ref([]);
const expenseCategories = ref([]);

const fetchTransaction = async () => {
  try {
    const res = await axios.get(`/api/transactions/${route.params.id}`);
    transaction.value = res.data;
    // 거래 이름이 '거래자 이름'이 아니 거래의 이름을 뜯하도록 설계 변경
    // transaction.value.userId = res.data.userId;
    // const user = userStore.userList.find(
    //   (user) => user.id === transaction.value.userId
    // );
    // if (user) {
    //   transaction.value.name = user.name;
    // }
  } catch (error) {
    console.error('거래 데이터를 불러오는 중 오류 발생:', error);
  }
};

const fetchCategories = async () => {
  try {
    const [incomeRes, expenseRes] = await Promise.all([
      axios.get('/api/incomeCategory'),
      axios.get('/api/expenseCategory'),
    ]);
    incomeCategories.value = incomeRes.data;
    expenseCategories.value = expenseRes.data;
  } catch (error) {
    console.error('카테고리 데이터를 불러오는 중 오류 발생:', error);
  }
};

onMounted(async () => {
  await userStore.fetchUsers();
  await fetchTransaction();
  await fetchCategories();
});

const allCategories = computed(() => {
  const categories =
    transaction.value.type === 'income'
      ? incomeCategories.value
      : expenseCategories.value;
  return categories.length
    ? categories
    : [{ id: 'default', name: '카테고리 선택' }];
});

const updateTransaction = async () => {
  if (!transaction.value.date) {
    alert('📅 날짜를 입력해주세요.');
    return;
  }
  if (!transaction.value.amount || transaction.value.amount <= 0) {
    alert('💰 올바른 금액을 입력해주세요.');
    return;
  }
  if (!transaction.value.category) {
    alert('📂 카테고리를 선택해주세요.');
    return;
  }

  try {
    await axios.put(`/api/transactions/${route.params.id}`, transaction.value);
    alert('거래 내역이 성공적으로 수정되었습니다.');
    router.back();
  } catch (error) {
    console.error('거래 내역 수정 중 오류 발생:', error);
    alert('거래 내역 수정에 실패했습니다.');
  }
};

const cancel = () => {
  router.back();
};
</script>

<style scoped>
.table {
  margin-top: -17px;
}

.table th {
  width: 150px;
  background-color: #f8f9fa;
  padding: 10px;
}

.table td {
  padding: 10px;
}

.save-button {
  background-color: #f8f9fa;
  border: 1px solid #007bff;
  color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #007bff;
  color: #fff;
}

.cancel-button {
  background-color: #f8f9fa;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #dc3545;
  color: #fff;
}

.text-center {
  text-align: center;
}
</style>
