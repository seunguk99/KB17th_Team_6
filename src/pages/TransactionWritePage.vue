<template>
  <div class="container mt-4">
    <form @submit.prevent="submitTransaction">
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
                placeholder="거래 이름을 입력해 주세요. (선택 사항)"
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
                placeholder="금액을 입력해 주세요."
              />
            </td>
          </tr>
          <tr>
            <th class="text-center">메모</th>
            <td>
              <textarea
                class="form-control"
                v-model="transaction.memo"
                placeholder="메모를 입력해 주세요. (선택 사항)"
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
import { useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transactionStore'; // transactionStore.js 사용
import { useUserStore } from '@/stores/userStore'; // userStore.js 사용
import axios from 'axios';

const router = useRouter();
const transactionStore = useTransactionStore(); // 거래 데이터 관리
const userStore = useUserStore(); // 사용자 데이터 관리

const transaction = ref({
  type: 'expense',
  date: '',
  name: '',
  amount: '',
  memo: '',
  category: '',
  userId: userStore.currentUser?.id, // userStore에서 현재 사용자 ID 사용
});

const incomeCategories = ref([]);
const expenseCategories = ref([]);

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
  await fetchCategories();
  await transactionStore.transactionList(); // transactionStore에서 거래 목록 불러오기
});

const allCategories = computed(() => {
  return transaction.value.type === 'income'
    ? incomeCategories.value // 수입 카테고리 리스트
    : expenseCategories.value; // 지출 카테고리 리스트
});

const submitTransaction = async () => {
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
    await axios.post('/api/transactions', transaction.value);
    await transactionStore.transactionList(); // 거래 목록 갱신
    alert('거래 내역이 등록되었습니다.');
    location.reload(); // 페이지 새로고침
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
.table {
  margin-top: -17px; /* 테이블 위쪽 여백을 추가 */
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
