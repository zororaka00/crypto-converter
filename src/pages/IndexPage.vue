<template>
  <!-- <q-page class="row items-center justify-evenly"> -->
  <q-page class="q-pa-md">
    <q-card style="max-width: 100%;">
      <div v-if="!isMobile" id='frame' style='width:100%;'><iframe data-aa='2340259' src='//ad.a-ads.com/2340259?size=728x90' style='width:100%; height:90px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe><a style='display: block; text-align: right; font-size: 12px' id='preview-link' href='https://aads.com/campaigns/new/?source_id=2340259&source_type=ad_unit&partner=2340259'>Advertise here</a></div>
      <div v-else id='frame' style='width:320px;'><iframe data-aa='2340260' src='//ad.a-ads.com/2340260?size=320x50' style='width:320px; height:50px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe><a style='display: block; text-align: right; font-size: 12px' id='preview-link' href='https://aads.com/campaigns/new/?source_id=2340260&source_type=ad_unit&partner=2340260'>Advertise here</a></div>
    </q-card><br/>
    <q-card flat bordered class="col text-center b-card">
      <q-card-section>
          <div class="text-h5 text-bold">Crypto Converter</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-select
          filled
          v-model="priceOption"
          label="Select Cryptocurrency"
          :options="converter.options"
          @update:model-value="updateToUSD()"
          class="full-width"
        /><br/>
        <q-input
            filled
            v-model="amount"
            type="number"
            label="Input Amount"
            @update:model-value="updateToUSD()"
        /><br/>
        <q-input
            filled
            v-model="amount_usd"
            type="number"
            label="To USD"
            readonly
            /><br/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useGeneralStore } from '../stores/general-store';
import { useConverterStore } from '../stores/converter-store';

const general = useGeneralStore();
const converter = useConverterStore();
const priceOption = ref('Bitcoin (BTC)');
const amount = ref('');
const amount_usd = ref('');
const isMobile = ref(true);

const updateToUSD = async () => {
  const indexPrice = await converter.list_prices.findIndex(d => d.cryptocurrency == priceOption.value);
  const price = Number(converter.list_prices[indexPrice].to_usd);
  amount_usd.value = general.numberToString((Number(amount.value) * price), 4);
};

onMounted(() => {
  if (converter.list_prices.length == 0) {
    converter.getPrice();
  }
  isMobile.value = window.innerWidth <= 768;
});

defineOptions({
  name: 'IndexPage'
});
</script>
