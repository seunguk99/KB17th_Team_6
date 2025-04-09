<template>
  <div class="container">
    <div class="row">
      <div class="d-grid">
        <!-- 빠른 추가 모달 관련 내용 -->
        <button
          type="button"
          class="btn btn-block btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#quickAdd"
        >
          빠른 추가
        </button>
        <QuickAdd @added="handleAdded" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <h3>최근 거래 요약</h3>
        <div class="card">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>이름</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td>{{ transaction.date }}</td>
                  <td>{{ transaction.name }}</td>
                  <td
                    :class="
                      transaction.type === 'income'
                        ? 'text-success'
                        : 'text-danger'
                    "
                  >
                    {{ transaction.amount.toLocaleString() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-6">
        <h3>{{ unformatted_month }}월의 수입/지출 요약</h3>
        <div class="card">
          <div class="card-body">
            <p>💰 수입 : {{ incomeTotal.toLocaleString() }}원</p>
            <p>💸 지출 : {{ expenseTotal.toLocaleString() }}원</p>
            <p
              :class="
                incomeTotal - expenseTotal >= 0 ? 'text-success' : 'text-danger'
              "
            >
              차액 : {{ (incomeTotal - expenseTotal).toLocaleString() }}원
            </p>

            <div
              class="alert alert-primary"
              v-if="incomeTotal - expenseTotal >= 0"
            >
              👏 잘하고 있어요!
            </div>
            <div class="alert alert-warning" v-else>
              😭 조금 더 아껴써야 할 것 같아요.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <h3>월별로 보기</h3>
        <div class="card">
          <vue-cal
            :events="events"
            events-on-month-view
            :views="{ month: {} }"
            view="month"
            :views-bar="false"
            :time="false"
            @cell-click="onDayClick"
          >
          </vue-cal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { VueCal } from 'vue-cal';
import QuickAdd from '@/components/transaction/QuickAdd.vue';
import 'vue-cal/style';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 모달 사용 위해
const date = new Date();
const month = ref();
month.value = date.getMonth() + 1;
const userStore = useUserStore();
const userId = userStore.currentUser?.id;
let unformatted_month = month.value;
month.value = month.value < 10 ? '0' + month.value : month.value;
let year_month = date.getFullYear() + '-' + month.value;
//캘린더 이벤트 관리하기
const events = ref([]);

//테스트용 트랜잭션 - 후에 store로 이전할 듯
const transactions = ref([]);

const temporary_fetch = () =>
  fetch(
    `http://localhost:3000/transactions?userId=${userId}&date_like=${year_month}`
  )
    .then((response) => response.json())
    .then((json) => {
      transactions.value = json;
      events.value = transactions.value.map((transaction) => ({
        title: `${
          transaction.type === 'income' ? '💰 수입' : '💸 지출'
        }: ${transaction.amount.toLocaleString()}원`,
        start: transaction.date,
        end: transaction.date,
        backgroundColor: transaction.type === 'income' ? '#3B71CA' : '#DC4C64',
      }));
    });
temporary_fetch();
const clickedDate = ref(null);

const onDayClick = (day) => {
  console.log('Clicked date:', day.cell.start);
};

const incomeTotal = computed(() =>
  transactions.value
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
);

const expenseTotal = computed(() =>
  transactions.value
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
);

const handleAdded = () => {
  temporary_fetch();
};
</script>
