<template>
  <div class="container mt-4" v-if="transaction">
    <div
      class="mb-4 p-4 rounded shadow-sm bg-white border border-secondary-subtle"
    >
      <h4 class="mb-4 fw-semibold text-dark text-center">
        {{
          transaction.type === 'income'
            ? '💰 수입 상세 내역'
            : '💸 지출 상세 내역'
        }}
      </h4>

      <table class="table align-middle custom-table text-center">
        <tbody>
          <tr>
            <th class="custom-th">📅 날짜</th>
            <td>{{ transaction.date }}</td>
          </tr>
          <tr>
            <th class="custom-th">📂 유형</th>
            <td>
              <span
                class="badge"
                :class="
                  transaction.type === 'income' ? 'bg-success' : 'bg-danger'
                "
              >
                {{ transaction.type === 'income' ? '수입' : '지출' }}
              </span>
            </td>
          </tr>
          <tr>
            <th class="custom-th">💵 금액</th>
            <td
              :class="
                transaction.type === 'income' ? 'text-success' : 'text-danger'
              "
              class="fw-semibold"
            >
              {{ transaction.amount.toLocaleString() }}원
            </td>
          </tr>
          <tr>
            <th class="custom-th">📑 카테고리</th>
            <td class="text-black">{{ transaction.category }}</td>
          </tr>
          <tr>
            <th class="custom-th">📝 메모</th>
            <td>{{ transaction.memo }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center my-4">
      <RouterLink class="btn btn-outline-primary me-2" to="/transactions">
        <i class="fa-solid fa-list"></i> 목록
      </RouterLink>
      <RouterLink
        :to="`/transactions/${id}/edit`"
        class="btn btn-outline-secondary me-2"
      >
        <i class="fa-regular fa-pen-to-square"></i> 수정
      </RouterLink>
      <button class="btn btn-outline-danger" @click="remove">
        <i class="fa-regular fa-trash-can"></i> 삭제
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-th {
  background-color: #e9f5ff;
  font-weight: 600;
  color: #333;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: none !important;
  border-right: none !important;
  width: 22%;
  padding: 0.5rem 0.75rem;
}

td {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: none !important;
  border-right: none !important;
}

.custom-table {
  border-left: none;
  border-right: none;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4em 0.6em;
}
</style>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';

const route = useRoute();
const id = parseInt(route.params.id);

const transactionStore = useTransactionStore();

onMounted(async () => {
  // 거래 목록 없으면 먼저 불러오기
  if (transactionStore.transactions.length === 0) {
    await transactionStore.transactionList();
  }

  // 선택된 거래 설정
  transactionStore.selectTransaction(id);
});

const transaction = computed(() => transactionStore.selectedTransaction);
</script>
