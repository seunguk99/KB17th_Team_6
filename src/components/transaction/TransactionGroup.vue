<template>
  <div class="container mt-4">
    <div class="d-flex flex-wrap gap-4">
      <div class="chart-wrapper">
        <div class="chart-container">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <div class="divider"></div>

      <div class="flex-grow-1 right-panel">
        <div class="d-flex justify-content-end gap-2 flex-wrap mb-3">
          <select
            class="form-select form-select-sm w-auto"
            v-model="store.selectedYear"
            @change="store.selectFilter"
          >
            <option :value="null">전체 연도</option>
            <option
              v-for="year in [2023, 2024, 2025]"
              :key="year"
              :value="year"
            >
              {{ year }}년
            </option>
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

        <div class="float-end mt-3 mx-3">
          현재 잔액 : {{ total.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';
import TransactionList from './TransactionList.vue';
import { createChartData, chartOptions, Chart } from '@/Chart/chart.js';
import { useUserStore } from '@/stores/userStore';

const store = useTransactionStore();
const userStore = useUserStore();

const total = computed(() => store.total);
const chartCanvas = ref(null);
let chartInstance = null;

const updateChart = () => {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext('2d');
  const income = store.filterdTransactions
    .filter((ts) => ts.type === 'income')
    .reduce((sum, ts) => sum + ts.amount, 0);
  const expense = store.filterdTransactions
    .filter((ts) => ts.type === 'expense')
    .reduce((sum, ts) => sum + ts.amount, 0);

  const data = createChartData(income, expense);

  if (chartInstance) {
    chartInstance.data = data;
    chartInstance.update();
    return;
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data,
    options: chartOptions,
  });
};

watch(
  () => store.filterdTransactions,
  () => {
    updateChart();
  },
  { deep: true }
);

onMounted(() => {
  updateChart();
});
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 280px;
}

.chart-container {
  width: 260px;
  height: 260px;
}

.divider {
  width: 1px;
  background-color: #ddd;
  margin: 0 10px;
}

.right-panel {
  min-width: 300px;
  flex: 1;
}

select {
  margin: 3px;
}
</style>
