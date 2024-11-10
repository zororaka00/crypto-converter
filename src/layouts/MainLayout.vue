<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="menu-navbar" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Crypto Converter
        </q-toolbar-title>

        <div v-if="!general.is_mobile"><q-btn filled color="positive" label="Buy Crypto" @click="toBuyCrypto()" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container v-if="isLoad">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { useGeneralStore } from '../stores/general-store';
import { useConverterStore } from 'src/stores/converter-store';

const route = useRoute();
const general = useGeneralStore();
const converter = useConverterStore();
const isLoad = ref(false);
const linksList: EssentialLinkProps[] = [
  {
    title: 'Price Converter',
    caption: 'Crypto to USD',
    icon: 'mdi-refresh-circle',
    toLink: '/'
  },
  {
    title: 'BTC Converter',
    caption: 'Bitcoin Unit',
    icon: 'mdi-currency-btc',
    toLink: '/btc-converter'
  },
  {
    title: 'ETH Converter',
    caption: 'Ethereum Unit',
    icon: 'mdi-ethereum',
    toLink: '/eth-converter'
  },
  {
    title: 'ETH Liquid Staking',
    caption: 'Best APR Liquid Staking',
    icon: 'mdi-ethereum',
    toLink: '/eth-liquid-staking'
  },
  {
    title: 'Donate',
    caption: 'Donate to Developer',
    icon: 'mdi-gift',
    toLink: '/donate'
  },
];
const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const toBuyCrypto = () => general.toUrl(general.is_indonesia ? 'https://www.bybitglobal.com/invite?ref=PJKQN' : 'https://www.bybit.com/en/invite/?ref=PJKQN');

onMounted(() => {
  const isMobile = route.query.app;
  general.is_mobile = isMobile == '1';
  isLoad.value = true;
  if (converter.list_prices.length == 0) {
    converter.getPrice();
  }
});

defineOptions({
  name: 'MainLayout'
});
</script>
