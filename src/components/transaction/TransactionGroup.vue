<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-end gap-2 flex-wrap mb-3">
      <select
        class="form-select form-select-sm w-auto"
        v-model="store.selectedYear"
        @change="store.selectFilter"
      >
        <option :value="null">전체 연도</option>
        <option :value="2023">2023년</option>
        <option :value="2024">2024년</option>
        <option :value="2025">2025년</option>
      </select>

      <select
        class="form-select form-select-sm w-auto"
        v-model="store.selectedMonth"
        @change="store.selectFilter"
      >
        <option :value="null">전체 월</option>
        <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
      </select>

      <select
        class="form-select form-select-sm w-auto"
        v-model="store.selectedType"
        @change="store.selectFilter"
      >
        <option :value="null">전체 타입</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>
    <TransactionList />
    <div class="float-end mt-3 mx-3">현재 잔액 : {{ total }}</div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import TransactionList from './TransactionList.vue';

const store = useTransactionStore();

const total = store.total;
</script>

<style scoped>
select {
  margin: 3px;
}
</style>
