<template>
  <div class="container mt-4">
    <div class="card shadow-sm border rounded-4 overflow-hidden">
      <table class="table table-hover text-center mb-0">
        <thead>
          <tr class="table-header text-dark">
            <th class="bg-sky text-dark py-3">날짜</th>
            <th class="bg-sky text-dark">타입</th>
            <th class="bg-sky text-dark">금액</th>
            <th class="bg-sky text-dark">카테고리</th>
            <th class="bg-sky text-dark"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="ts in store.filterdTransactions" :key="ts.id">
            <TransactionItem :ts="ts"></TransactionItem>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { onMounted } from 'vue';
import TransactionItem from './TransactionItem.vue';

const store = useTransactionStore();

onMounted(async () => {
  await store.transactionList();
  store.selectFilter();
});
</script>

<style scoped>
.table-header th {
  background-color: #e8f4fd !important; /* 연하늘색 */
  font-weight: 600;
}
.card {
  border: none;
  border-radius: 1rem;
}
th,
td {
  vertical-align: middle;
}
</style>
