<template>
  <div class="p-6">
    <TransactionGroup />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';
import TransactionGroup from '@/components/transaction/TransactionGroup.vue';
const store = useTransactionStore();
onMounted(async () => {
  await store.transactionList();
  store.selectFilter();
});
</script>
