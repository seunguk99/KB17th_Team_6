<template>
  <div class="container mt-4">
    <form @submit.prevent="submitTransaction">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>거래 유형</th>
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
            <th>날짜</th>
            <td>
              <input
                type="date"
                class="form-control"
                v-model="transaction.date"
              />
            </td>
          </tr>
          <tr>
            <th>거래 이름</th>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="transaction.name"
              />
            </td>
          </tr>
          <tr>
            <th>금액</th>
            <td>
              <input
                type="number"
                class="form-control"
                v-model="transaction.amount"
              />
            </td>
          </tr>
          <tr>
            <th>메모</th>
            <td>
              <textarea
                class="form-control"
                v-model="transaction.memo"
              ></textarea>
            </td>
          </tr>
          <tr>
            <th>카테고리</th>
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
        <button type="submit" class="btn btn-primary me-2">저장</button>
        <button type="button" class="btn btn-secondary" @click="cancel">
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
.table th {
  width: 150px;
  background-color: #f8f9fa;
}
</style>
