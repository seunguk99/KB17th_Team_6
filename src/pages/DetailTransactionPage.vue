<template>
  <div class="container mt-4" v-if="transaction">
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
      <RouterLink
        :to="`/transactions/${id}/edit`"
        class="btn btn-secondary me-2"
      >
        <i class="fa-regular fa-pen-to-square"></i> 수정
      </RouterLink>
      <button class="btn btn-danger" @click="remove">
        <i class="fa-regular fa-trash-can"></i> 삭제
      </button>
    </div>
  </div>
</template>
