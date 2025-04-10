<template>
  <div class="modal" id="quickAdd">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- 제목 -->
        <div class="modal-header">
          <h4 class="modal-title">빠른 추가하기</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- 추가 창 -->
        <div class="modal-body">
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
                        <label class="form-check-label" for="income"
                          >수입</label
                        >
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="expense"
                          value="expense"
                          v-model="transaction.type"
                        />
                        <label class="form-check-label" for="expense"
                          >지출</label
                        >
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
              <button
                type="submit"
                class="btn btn-primary me-2"
                data-bs-dismiss="modal"
              >
                저장하기
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                취소하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { useTransactionStore } from '@/stores/transactionStore';

const userStore = useUserStore();
const transactionStore = useTransactionStore();

const transaction = ref({
  type: 'expense',
  date: '',
  name: '',
  amount: '',
  memo: '',
  category: '',
  userId: userStore.currentUser?.id,
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
    console.error('카테고리 로드 실패:', error);
  }
};

onMounted(() => {
  fetchCategories();
});

const allCategories = computed(() =>
  transaction.value.type === 'income'
    ? incomeCategories.value
    : expenseCategories.value
);

const submitTransaction = async () => {
  if (
    !transaction.value.date ||
    !transaction.value.amount ||
    !transaction.value.category
  ) {
    alert('날짜, 금액, 카테고리를 입력해야 합니다.');
    return;
  }
  try {
    await axios.post('/api/transactions', transaction.value);
    await transactionStore.transactionList();
    alert('거래 내역이 등록되었습니다.');
    transaction.value = {
      type: 'expense',
      date: '',
      name: '',
      amount: '',
      memo: '',
      category: '',
      userId: userStore.currentUser?.id,
    };
  } catch (error) {
    console.error('저장 실패:', error);
    alert('거래 내역 저장에 실패했습니다.');
  }
};
</script>
