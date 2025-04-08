<template>
  <div class="p-6">
    <div v-if="transactions.length === 0">거래 내역이 없습니다.</div>

    <ul v-else class="space-y-4">
      <li
        v-for="tx in transactions"
        :key="tx.id"
        @click="goToDetail(tx.id)"
        class="p-4 border rounded hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex justify-between items-center">
          <span class="font-semibold">{{ tx.category }}</span>
          <span
            :class="tx.type === 'income' ? 'text-green-600' : 'text-red-500'"
          >
            {{ tx.type === 'income' ? '+' : '-'
            }}{{ tx.amount.toLocaleString() }}원
          </span>
        </div>
        <div class="text-sm text-gray-500">{{ tx.date }} · {{ tx.memo }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
// store가 만들어지면 아래 코드로 교체할 예정
// import { useTransactionStore } from '@/stores/transactionStore';
// const transactionStore = useTransactionStore();
// const transactions = computed(() => transactionStore.transactions);

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const transactions = ref([]);

const fetchTransactions = async () => {
  const res = await axios.get('/api/transactions'); // 프록시 적용된 경로
  transactions.value = res.data;
};

const goToDetail = (id) => {
  router.push(`/transactions/${id}`);
};

onMounted(() => {
  fetchTransactions();
});
</script>
