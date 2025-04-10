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
                <td>{{ transaction.type }}</td>
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

// 함수로 분리해서 fetch 실행
const fetchTransactions = () => {
  // 날짜 값이 없으면 요청하지 않음
  if (!props.selectedDate.year) {
    transactions.value = [];
    return;
  }

  const dateStr = `${props.selectedDate.year}-${props.selectedDate.month}-${props.selectedDate.day}`;

  fetch(`http://localhost:3000/transactions?userId=${userId}&date=${dateStr}`)
    .then((response) => response.json())
    .then((json) => {
      transactions.value = json;
    })
    .catch((error) => {
      console.error('Failed to fetch transactions:', error);
      transactions.value = [];
    });
};

// 컴포넌트 마운트 시 한 번 fetch
fetchTransactions();

// props.selectedDate 변경 감지해서 fetch 다시 실행
watch(
  () => props.selectedDate,
  (newVal, oldVal) => {
    // 값이 달라졌으면 fetch 실행
    fetchTransactions();
  },
  { deep: true }
);
</script>
