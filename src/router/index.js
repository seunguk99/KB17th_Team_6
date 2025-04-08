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
    { path: '/', component: UserSelection },
    { path: '/home', component: HomePage },
    { path: '/transactions', component: TransactionHistory },
    { path: '/transactions/new', component: TransactionWritePage },
    { path: '/transactions/:id', component: DetailTransactionPage },
    { path: '/transactions/:id/edit', component: TransactionEditPage },
    { path: '/profile', component: ProfilePage },
    { path: '/profile/edit', component: EditProfilePage },
  ],
});

export default router;
