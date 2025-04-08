<template>
  <div class="container">
    <div class="float-end m-4">
      <!-- 년도별 -->
      <select v-model="store.selectedYear" @change="store.selectFilter">
        <option :value="null">전체 연도</option>
        <option :value="2023">2023년</option>
        <option :value="2024">2024년</option>
        <option :value="2025">2025년</option>
      </select>
      <!-- 월별 -->
      <select v-model="store.selectedMonth" @change="store.selectFilter">
        <option :value="null">전체 월</option>
        <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
      </select>
      <!-- 타입별 -->
      <select v-model="store.selectedType" @change="store.selectFilter">
        <option :value="null">전체 타입</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>
    <TransactionList />
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import TransactionList from './TransactionList.vue';

const store = useTransactionStore();
</script>

<style scoped>
select {
  margin: 3px;
}
</style>
