<template>
  <tr @click="TSdetail" style="cursor: pointer">
    <td class="align-middle">{{ ts.date }}</td>

    <td class="align-middle">
      <span
        class="badge"
        :class="ts.type === 'income' ? 'bg-success' : 'bg-danger'"
      >
        {{ ts.type === 'income' ? '수입' : '지출' }}
      </span>
    </td>

    <td
      class="align-middle fw-semibold"
      :class="ts.type === 'income' ? 'text-success' : 'text-danger'"
    >
      {{ formattedAmount }}
    </td>

    <td class="align-middle">{{ ts.category }}</td>

    <td class="align-middle">
      <RouterLink
        :to="`/transactions/${ts.id}/edit`"
        class="btn btn-outline-primary btn-sm me-2 text-decoration-none"
        @click.stop
      >
        <i class="fa-regular fa-pen-to-square"></i> 수정
      </RouterLink>

      <button
        @click.stop="delTS(ts.id)"
        class="btn btn-outline-danger btn-sm ms-2"
      >
        <i class="fa-regular fa-trash-can"></i> 삭제
      </button>
    </td>
  </tr>
</template>

<script setup>
import router from '@/router';
import { useTransactionStore } from '@/stores/transactionStore';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

const props = defineProps(['ts']);
const store = useTransactionStore();

const formattedAmount = computed(() => {
  return `${props.ts.amount.toLocaleString()}원`;
});

const delTS = async (id) => {
  const isConfirmed = window.confirm('정말 삭제하시겠습니까?');

  if (!isConfirmed) return;

  await axios.delete(`/api/transactions/${id}`);
  await store.transactionList();
  store.selectFilter();
};

const TSdetail = () => {
  router.push(`/transactions/${props.ts.id}`);
};
</script>

<style scoped>
.badge {
  font-size: 0.75rem;
  padding: 0.4em 0.6em;
}
td {
  vertical-align: middle !important;
  padding: 0.75rem 1rem;
}
.btn-outline-primary {
  background-color: white;
  border: 1px solid #0d6efd;
  color: #0d6efd;
}
.btn-outline-primary:hover {
  background-color: #0d6efd;
  color: white;
}

.btn-outline-danger {
  background-color: white;
  border: 1px solid #dc3545;
  color: #dc3545;
}
.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}
</style>
