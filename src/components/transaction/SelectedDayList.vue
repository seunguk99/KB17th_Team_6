<template>
  <div class="modal modal-lg" tabindex="-1" id="selected_day_list">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">상세 내역</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th>이름</th>
                <th>종류</th>
                <th>카테고리</th>
                <th>금액</th>
                <th>메모</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id">
                <td>{{ transaction.name }}</td>
                <td>{{ transaction.type === 'income' ? '수입' : '지출' }}</td>
                <td>{{ transaction.category }}</td>
                <td>{{ transaction.amount.toLocaleString() }}원</td>
                <td>{{ transaction.memo }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';

const props = defineProps({
  selectedDate: {
    type: Object,
    default: () => ({ year: '', month: '', day: '' }),
  },
});

const userStore = useUserStore();
const userId = userStore.currentUser?.id;
const transactions = ref([]);

const fetchTransactions = () => {
  if (!props.selectedDate.year) {
    transactions.value = [];
    return;
  }

  const dateStr = `${props.selectedDate.year}-${props.selectedDate.month}-${props.selectedDate.day}`;

  fetch(`/api/transactions?userId=${userId}&date=${dateStr}`)
    .then((response) => response.json())
    .then((json) => {
      transactions.value = json;
    })
    .catch((error) => {
      console.error('Failed to fetch transactions:', error);
      transactions.value = [];
    });
};

fetchTransactions();

watch(
  () => props.selectedDate,
  (newVal, oldVal) => {
    fetchTransactions();
  },
  { deep: true }
);
</script>
