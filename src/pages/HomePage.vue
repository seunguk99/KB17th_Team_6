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
        <QuickAdd />
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
            <p>💰 수입 : {{ monthly_income.toLocaleString() }}원</p>
            <p>💸 지출 : {{ monthly_expense.toLocaleString() }}원</p>
            <p
              :class="
                monthly_income - monthly_expense >= 0
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              차액 : {{ (monthly_income - monthly_expense).toLocaleString() }}원
            </p>

            <div
              class="alert alert-primary"
              v-if="monthly_income - monthly_expense >= 0"
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
          <SelectedDayList :selected-date="selectedDateObj" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { VueCal } from 'vue-cal';
import QuickAdd from '@/components/transaction/QuickAdd.vue';
import SelectedDayList from '@/components/transaction/SelectedDayList.vue';
import * as bootstrap from 'bootstrap';
import 'vue-cal/style';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 모달 사용 위해
const date = new Date();
const month = ref();
month.value = date.getMonth() + 1;
const userStore = useUserStore();
const transactionStore = useTransactionStore();
const userId = userStore.currentUser?.id;
let unformatted_month = month.value;
month.value = month.value < 10 ? '0' + month.value : month.value;
let year_month = date.getFullYear() + '-' + month.value;
//캘린더 이벤트 관리하기
const events = computed(() => transactionStore.events);

const transactions = computed(() => transactionStore.transactions);

const selectedDateObj = ref({ year: '', month: '', day: '' });

const monthly_income = computed(() => transactionStore.monthly_income);
const monthly_expense = computed(() => transactionStore.monthly_expense);

const format_date_to_object = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return {
    year: yyyy,
    month: mm,
    day: dd,
  };
};

const onDayClick = (day) => {
  selectedDateObj.value = format_date_to_object(day.cell.start);
  const modalEl = document.getElementById('selected_day_list');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

onMounted(async () => {
  await transactionStore.transactionList();
  await transactionStore.monthlyTransactionList();
});
</script>
