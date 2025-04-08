import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import TransactionHistory from '@/pages/TransactionHistory.vue';
import TransactionEditPage from '@/pages/TransactionEditPage.vue';
import TransactionWritePage from '@/pages/TransactionWritePage.vue';
import DetailTransactionPage from '@/pages/DetailTransactionPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import EditProfilePage from '@/pages/EditProfilePage.vue';
import UserSelection from '@/pages/UserSelection.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'userSelection',
      component: UserSelection,
      meta: { title: '로그인' },
    },
    {
      path: '/home',
      name: 'homePage',
      component: HomePage,
      meta: { title: 'Home' },
    },
    {
      path: '/transactions',
      name: 'transactionHistory',
      component: TransactionHistory,
      meta: { title: '거래 내역' },
    },
    {
      path: '/transactions/new',
      name: 'transactionWritePage',
      component: TransactionWritePage,
      meta: { title: '거래 내역 등록' },
    },
    {
      path: '/transactions/:id',
      name: 'detailTransactionPage',
      component: DetailTransactionPage,
      meta: { title: '상세 거래 내역' },
    },
    {
      path: '/transactions/:id/edit',
      name: 'transactionEditPage',
      component: TransactionEditPage,
      meta: { title: '거래 내역 수정' },
    },
    {
      path: '/profile',
      name: 'profilePage',
      component: ProfilePage,
      meta: { title: '설정 및 프로필' },
    },
    {
      path: '/profile/edit',
      name: 'editProfilePage',
      component: EditProfilePage,
      meta: { title: '프로필 수정' },
    },
  ],
});

export default router;
