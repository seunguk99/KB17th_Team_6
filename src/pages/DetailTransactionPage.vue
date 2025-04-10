<template>
  <div class="container mt-4" v-if="transaction">
    <div
      class="card shadow-sm border border-secondary-subtle mb-4 rounded-4 overflow-hidden"
    >
      <div
        class="card-header text-center fw-semibold fs-5 text-dark bg-white border-bottom-0"
      >
        {{
          transaction.type === 'income'
            ? '💰 수입 상세 내역'
            : '💸 지출 상세 내역'
        }}
      </div>

      <div class="card-body p-0">
        <table class="table align-middle custom-table text-center mb-0">
          <tbody>
            <tr>
              <th class="custom-th">이름</th>
              <td class="custom-td">{{ transaction.name }}</td>
            </tr>
            <tr>
              <th class="custom-th">날짜</th>
              <td class="custom-td">{{ transaction.date }}</td>
            </tr>
            <tr>
              <th class="custom-th">유형</th>
              <td class="custom-td">
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
              <th class="custom-th">금액</th>
              <td
                :class="
                  transaction.type === 'income' ? 'text-success' : 'text-danger'
                "
                class="fw-semibold custom-td"
              >
                {{ transaction.amount.toLocaleString() }}원
              </td>
            </tr>
            <tr>
              <th class="custom-th">카테고리</th>
              <td class="custom-td text-black">{{ transaction.category }}</td>
            </tr>
            <tr>
              <th class="custom-th">메모</th>
              <td class="custom-td">{{ transaction.memo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center my-4">
      <RouterLink class="btn btn-outline-secondary me-2" to="/transactions">
        <i class="fa-solid fa-list"></i> 목록
      </RouterLink>
      <RouterLink
        :to="`/transactions/${id}/edit`"
        class="btn btn-outline-primary me-2"
      >
        <i class="fa-regular fa-pen-to-square"></i> 수정
      </RouterLink>
      <button class="btn btn-outline-danger" @click="remove">
        <i class="fa-regular fa-trash-can"></i> 삭제
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';

const route = useRoute();
const router = useRouter();
const id = parseInt(route.params.id);

const transactionStore = useTransactionStore();

onMounted(async () => {
  await transactionStore.transactionList();
  transactionStore.selectTransaction(id);
});

const transaction = computed(() => transactionStore.selectedTransaction);

const remove = async () => {
  const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
  if (!isConfirmed) return;

  await transactionStore.deleteTransaction(id);
  await transactionStore.transactionList();
  router.push('/transactions');
};
</script>

<style scoped>
.custom-th {
  background-color: #e9f5ff;
  font-weight: 600;
  color: #333;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: none !important;
  border-right: none !important;
  width: 30%;
  padding: 0.75rem 1rem;
}

td {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: none !important;
  border-right: none !important;
  padding: 0.75rem 1rem;
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
