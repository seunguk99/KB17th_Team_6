<template>
  <tr @click="TSdetail">
    <td>{{ ts.date }}</td>
    <td>{{ ts.type }}</td>
    <td>{{ ts.amount }}</td>
    <td>{{ ts.category }}</td>
    <td>
      <RouterLink
        :to="`/transactions/${ts.id}/edit`"
        class="btn btn-primary mx-1 text-decoration-none"
        @click.stop
        >수정</RouterLink
      >
      <button
        @click.stop="delTS(ts.id)"
        class="btn btn-danger text-decoration-none"
      >
        삭제
      </button>
    </td>
  </tr>
</template>

<script setup>
import router from '@/router';
import { useTransactionStore } from '@/stores/transactionStore';
import axios from 'axios';
import { RouterLink } from 'vue-router';

const props = defineProps(['ts']);
const store = useTransactionStore();

const delTS = async (id) => {
  await axios.delete(`/api/transactions/${id}`);
  await store.transactionList();
  store.selectFilter();
};

const TSdetail = () => {
  router.push(`/transactions/${props.ts.id}`);
};
</script>
