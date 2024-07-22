<template>
<!-- <q-page class="row items-center justify-evenly"> -->
<q-page class="q-pa-md">
    <AdsComponent /><br/>
    <q-card flat bordered class="col text-center b-card">
        <q-card-section>
            <div class="text-h5 text-bold">Bitcoin Converter</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
            <q-input
                filled
                v-model="amount_satoshi"
                type="number"
                label="Satoshi"
                @update:model-value="updateUnit('satoshi')"
            >
                <template v-slot:append>
                    <small class="text-bold">Satoshi</small>
                </template>
            </q-input><br/>
            <q-input
                filled
                v-model="amount_micro"
                type="number"
                label="Microbitcoin (μBTC/bits)"
                @update:model-value="updateUnit('micro')"
            >
                <template v-slot:append>
                    <small class="text-bold">μBTC</small>
                </template>
            </q-input><br/>
            <q-input
                filled
                v-model="amount_milli"
                type="number"
                label="Millibitcoin (mBTC)"
                @update:model-value="updateUnit('milli')"
            >
                <template v-slot:append>
                    <small class="text-bold">mBTC</small>
                </template>
            </q-input><br/>
            <q-input
                filled
                v-model="amount_bitcoin"
                type="number"
                label="Bitcoin (BTC)"
                @update:model-value="updateUnit('bitcoin')"
            >
                <template v-slot:append>
                    <small class="text-bold">BTC</small>
                </template>
            </q-input><br/>
            <q-input
                filled
                v-model="total_price"
                type="number"
                label="Total Price"
                :hint="price_usd"
                readonly
            >
                <template v-slot:append>
                    <small class="text-bold">USD</small>
                </template>
            </q-input>
        </q-card-section>
    </q-card>
</q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import AdsComponent from '../components/AdsComponent.vue';
import { useGeneralStore } from '../stores/general-store';
import { useConverterStore } from 'src/stores/converter-store';

const general = useGeneralStore();
const converter = useConverterStore();
const amount_satoshi = ref('');
const amount_micro = ref('');
const amount_milli = ref('');
const amount_bitcoin = ref('');
const indexPrice = ref(0);
const price_usd = computed(() => {
    const index = converter.list_prices.findIndex(fd => fd.symbol == 'BTC');
    indexPrice.value = index;
    return `Price BTC: ${index >= 0 ? converter.list_prices[index].to_usd : 0} USD`;
});
const total_price = ref('');

const updateUnit = async (type: string) => {
    var amount = 0;

    if (type == 'satoshi') {
        amount = Number(amount_satoshi.value) / (10 ** 8);
    } else if (type == 'micro') {
        amount = Number(amount_micro.value) / (10 ** 6);
    } else if (type == 'milli') {
        amount = Number(amount_milli.value) / (10 ** 3);
    } else if (type == 'bitcoin') {
        amount = Number(amount_bitcoin.value);
    }

    await Promise.all([
        type != 'satoshi' ? amount_satoshi.value = general.numberToString(amount * (10 ** 8), 18) : null,
        type != 'micro' ? amount_micro.value = general.numberToString(amount * (10 ** 6), 18) : null,
        type != 'milli' ? amount_milli.value = general.numberToString(amount * (10 ** 3), 18) : null,
        type != 'bitcoin' ? amount_bitcoin.value = general.numberToString(amount, 18) : null,
        total_price.value = general.numberToString(amount * Number(converter.list_prices[indexPrice.value].to_usd), 18)
    ]);
};

defineOptions({
    name: 'BitcoinConverterPage'
});
</script>
