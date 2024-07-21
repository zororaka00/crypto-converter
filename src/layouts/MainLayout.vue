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

const route = useRoute();
const general = useGeneralStore();
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
];
const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  const isMobile = route.query.app;
  general.is_mobile = isMobile == '1';
  isLoad.value = true;
});

defineOptions({
  name: 'MainLayout'
});
</script>
