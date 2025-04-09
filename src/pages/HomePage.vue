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
        <div class="modal" id="quickAdd">
          <div class="modal-dialog">
            <div class="modal-content">
              <!-- 제목 -->
              <div class="modal-header">
                <h4 class="modal-title">빠른 추가하기</h4>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <!-- 추가 창 -->
              <div class="modal-body">
                <form @submit.prevent="submitTransaction">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th>거래 유형</th>
                        <td>
                          <div class="radio-group d-flex">
                            <div class="form-check me-3">
                              <input
                                class="form-check-input"
                                type="radio"
                                id="income"
                                value="income"
                                v-model="transaction.type"
                              />
                              <label class="form-check-label" for="income"
                                >수입</label
                              >
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                id="expense"
                                value="expense"
                                v-model="transaction.type"
                              />
                              <label class="form-check-label" for="expense"
                                >지출</label
                              >
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>날짜</th>
                        <td>
                          <input
                            type="date"
                            class="form-control"
                            v-model="transaction.date"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>거래 이름</th>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            v-model="transaction.name"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>금액</th>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            v-model="transaction.amount"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>메모</th>
                        <td>
                          <textarea
                            class="form-control"
                            v-model="transaction.memo"
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <th>카테고리</th>
                        <td>
                          <select
                            class="form-control"
                            v-model="transaction.category"
                          >
                            <option value="" disabled>
                              카테고리를 선택하세요
                            </option>
                            <option
                              v-for="category in allCategories"
                              :key="category.id"
                              :value="category.name"
                            >
                              {{ category.name }}
                            </option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center my-4">
                    <button
                      type="submit"
                      class="btn btn-primary me-2"
                      data-bs-dismiss="modal"
                    >
                      저장하기
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      취소하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
                  <td>{{ transaction.category }}</td>
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
import { useTransactionStore } from '@/stores/transactionStore';
import { onMounted } from 'vue';
import axios from 'axios';
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

//급해서 일단 TransactionWrite 부분 복사

const transactionStore = useTransactionStore();

const transaction = ref({
  type: 'expense',
  date: '',
  name: '',
  amount: '',
  memo: '',
  category: '',
  userId: userStore.currentUser?.id, // userStore에서 현재 사용자 ID 사용
});

const incomeCategories = ref([]);
const expenseCategories = ref([]);

const fetchCategories = async () => {
  try {
    const [incomeRes, expenseRes] = await Promise.all([
      axios.get('/api/incomeCategory'),
      axios.get('/api/expenseCategory'),
    ]);
    incomeCategories.value = incomeRes.data;
    expenseCategories.value = expenseRes.data;
  } catch (error) {
    console.error('카테고리 데이터를 불러오는 중 오류 발생:', error);
  }
};

onMounted(async () => {
  await fetchCategories();
  await transactionStore.transactionList(); // transactionStore에서 거래 목록 불러오기
});

const allCategories = computed(() => {
  return transaction.value.type === 'income'
    ? incomeCategories.value // 수입 카테고리 리스트
    : expenseCategories.value; // 지출 카테고리 리스트
});

const submitTransaction = async () => {
  try {
    await axios.post('/api/transactions', transaction.value);
    await transactionStore.transactionList(); // 거래 목록 갱신
    alert('거래 내역이 등록되었습니다.');
    temporary_fetch();
    transaction.value = {
      type: 'expense',
      date: '',
      name: '',
      amount: '',
      memo: '',
      category: '',
      userId: userStore.currentUser?.id, // userStore에서 현재 사용자 ID 사용
    };
  } catch (error) {
    console.error('거래 내역 저장 중 오류 발생:', error);
    alert('거래 내역 저장에 실패했습니다.');
  }
};
</script>
