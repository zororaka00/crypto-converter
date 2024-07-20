<template>
  <!-- <q-page class="row items-center justify-evenly"> -->
  <q-page class="q-pa-md">
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

const updateToUSD = async () => {
  const indexPrice = await converter.list_prices.findIndex(d => d.cryptocurrency == priceOption.value);
  const price = Number(converter.list_prices[indexPrice].to_usd);
  amount_usd.value = general.numberToString((Number(amount.value) * price), 4);
};

onMounted(() => {
  if (converter.list_prices.length == 0) {
    converter.getPrice();
  }
});

defineOptions({
  name: 'IndexPage'
});
</script>
