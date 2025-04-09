// transactionStore.js

import { defineStore } from 'pinia';
import axios from 'axios';
import { computed, ref } from 'vue';
import { useUserStore } from './userStore';

export const useTransactionStore = defineStore('transaction', () => {
  const TsURL = '/api/transactions';
  const userStore = useUserStore();

  // state
  const transactions = ref([]);
  const selectedTransaction = ref(null);

  const filterdTransactions = ref([]);
  const selectedYear = ref(null);
  const selectedMonth = ref(null);
  // const selectedCategory = ref(null);
  const selectedType = ref(null);

  // getters
  const income = computed(() => {
    filterdTransactions.value.filter((ts) => ts.type === 'income');
  });

  const expense = computed(() => {
    filterdTransactions.value.filter((ts) => ts.type === 'expense');
  });

  // 현재 남은 잔액
  const total = computed(() => {
    const userId = useUserStore().currentUser?.id;

    const userTransactions = transactions.value.filter(
      (ts) => ts.userId === userId
    );

    // 수입 합계
    const incomeTotal = userTransactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    // 지출 합계
    const expenseTotal = userTransactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return incomeTotal - expenseTotal;
  });

  // action
  // 거래 내역 리스트 불러오기
  const transactionList = async () => {
    const response = await axios.get(TsURL);
    const userStore = useUserStore();
    const userId = userStore.currentUser?.id;
    if (!userId) {
      transactions.value = [];
      return;
    }
    transactions.value = response.data.filter((tx) => tx.userId === userId);
  };

  // 현재 선택 거래
  const selectTransaction = async (id) => {
    selectedTransaction.value = transactions.value.find((ts) => ts.id === id);
  };

  // 필터링 (선택한 년, 월, 카테고리, 타입에 맞는 거래 내역만 보이기)
  const selectFilter = () => {
    filterdTransactions.value = transactions.value.filter((ts) => {
      const day = new Date(ts.date);
      const year = day.getFullYear();
      const month = day.getMonth() + 1;

      const yearMatch = !selectedYear.value || year === selectedYear.value;
      const monthMatch = !selectedMonth.value || month === selectedMonth.value;
      const typeMatch = !selectedType.value || ts.type === selectedType.value;
      // const categoryMatch =
      //   !selectedCategory.value || ts.category === selectedCategory.value;

      return yearMatch && monthMatch && typeMatch;
    });
  };

  return {
    transactions,
    selectedTransaction,
    filterdTransactions,
    selectedYear,
    selectedMonth,
    selectedType,
    transactionList,
    selectTransaction,
    selectFilter,
    income,
    expense,
    total,
  };
});
