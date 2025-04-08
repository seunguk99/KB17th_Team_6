<template>
  <div class="container mt-4" v-if="transaction && user">
    <h3 class="mb-3">
      {{ transaction.type === 'income' ? '📥 수입 상세' : '📤 지출 상세' }}
    </h3>

    <table class="table table-bordered">
      <tbody>
        <tr>
          <th>날짜</th>
          <td>{{ transaction.date }}</td>
        </tr>
        <tr>
          <th>유형</th>
          <td
            :class="
              transaction.type === 'income' ? 'text-success' : 'text-danger'
            "
          >
            {{ transaction.type === 'income' ? '수입' : '지출' }}
          </td>
        </tr>
        <tr>
          <th>금액</th>
          <td>{{ transaction.amount.toLocaleString() }}원</td>
        </tr>
        <tr>
          <th>카테고리</th>
          <td>{{ transaction.category }}</td>
        </tr>
        <tr>
          <th>메모</th>
          <td>{{ transaction.memo }}</td>
        </tr>
      </tbody>
    </table>

    <div class="text-center my-4">
      <RouterLink class="btn btn-primary me-2" to="/transactions">
        <i class="fa-solid fa-list"></i> 목록
      </RouterLink>
      <button class="btn btn-danger" @click="remove">
        <i class="fa-regular fa-trash-can"></i> 삭제
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const id = parseInt(route.params.id);

const transaction = ref(null);
const user = ref(null);

const load = async () => {
  try {
    const txRes = await axios.get(`/api/transactions/${id}`);
    transaction.value = txRes.data;

    // userId를 기반으로 사용자 정보 가져오기
    const userRes = await axios.get(`/api/users/${transaction.value.userId}`);
    user.value = userRes.data;
  } catch (err) {
    console.error('불러오기 오류:', err);
  }
};

const remove = async () => {
  if (!confirm('이 거래를 삭제할까요?')) return;
  await axios.delete(`/api/transactions/${id}`);
  router.push('/transactions');
};

load();
</script>
