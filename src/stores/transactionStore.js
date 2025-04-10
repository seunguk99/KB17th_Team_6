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
  const monthlyTransactions = ref([]);
  const selectedTransaction = ref(null);

  const filterdTransactions = ref([]);
  const selectedYear = ref(null);
  const selectedMonth = ref(null);
  // const selectedCategory = ref(null);
  const selectedType = ref(null);
  const events = ref([]);

  // getters
  const income = computed(() => {
    filterdTransactions.value.filter((ts) => ts.type === 'income');
  });

  const expense = computed(() => {
    filterdTransactions.value.filter((ts) => ts.type === 'expense');
  });

  const monthly_income = computed(() => {
    return monthlyTransactions.value
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  });

  const monthly_expense = computed(() => {
    return monthlyTransactions.value
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  });

  // 현재 남은 잔액
  const total = computed(() => {
    const userId = userStore.currentUser?.id;

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

    transactions.value = response.data
      .filter((tx) => tx.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    updateEvents(transactions.value);
  };

  //캘린더 이벤트 업데이트 함수
  const updateEvents = (transactionList) => {
    events.value = transactionList.map((transaction) => ({
      title: `${
        transaction.type === 'income' ? '💰 수입' : '💸 지출'
      }: ${transaction.amount.toLocaleString()}원`,
      start: transaction.date,
      end: transaction.date,
      backgroundColor: transaction.type === 'income' ? '#3B71CA' : '#DC4C64',
    }));
    console.log(events.value);
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

  // 거래 삭제 함수 추가
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${TsURL}/${id}`);
      // 삭제된 거래는 state에서도 제거해줘야 함
      transactions.value = transactions.value.filter((ts) => ts.id !== id);
      // 선택된 거래 초기화
      selectedTransaction.value = null;
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  const monthlyTransactionList = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const y_m = year + '-' + month;
    const userStore = useUserStore();
    const userId = userStore.currentUser?.id;
    console.log(y_m);
    const response = await axios.get(
      `${TsURL}?userId=${userId}&date_like=${y_m}`
    );

    if (!userId) {
      transactions.value = [];
      return;
    }
    monthlyTransactions.value = response.data;
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
    deleteTransaction,
    events,
    monthlyTransactionList,
    monthly_income,
    monthly_expense,
  };
});
