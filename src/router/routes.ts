import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/btc-converter',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BitcoinConverterPage.vue') }],
  },
  {
    path: '/eth-converter',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/EthereumConverterPage.vue') }],
  },
  {
    path: '/eth-liquid-staking',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/EthereumLiquidStakingPage.vue') }],
  },
  {
    path: '/developer',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DeveloperPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  },
];

export default routes;
