<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>날짜</th>
          <th>타입</th>
          <th>금액</th>
          <th>카테고리</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="ts in store.filterdTransactions" :key="ts.id">
          <TransactionItem :ts="ts"></TransactionItem>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { onMounted } from 'vue';
import TransactionItem from './TransactionItem.vue';

const store = useTransactionStore();

// 거래 불러오기
onMounted(async () => {
  await store.transactionList();
  store.selectFilter();
});
</script>
