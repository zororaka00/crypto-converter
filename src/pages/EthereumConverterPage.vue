<template>
<!-- <q-page class="row items-center justify-evenly"> -->
<q-page class="q-pa-md">
    <AdsComponent /><br/>
    <q-card flat bordered class="col text-center b-card">
    <q-card-section>
        <div class="text-h5 text-bold">Ethereum Converter</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
        <q-input
            filled
            v-model="amount_wei"
            type="number"
            label="Wei"
            @update:model-value="updateUnit('wei')"
         >
            <template v-slot:append>
                <small class="text-bold">Wei</small>
            </template>
        </q-input><br/>
        <q-input
            filled
            v-model="amount_kwei"
            type="number"
            label="Kwei (Kilowei)"
            @update:model-value="updateUnit('kwei')"
         >
            <template v-slot:append>
                <small class="text-bold">Kwei</small>
            </template>
        </q-input><br/>
        <q-input
            filled
            v-model="amount_mwei"
            type="number"
            label="Mwei (Megawei)"
            @update:model-value="updateUnit('mwei')"
         >
            <template v-slot:append>
                <small class="text-bold">Mwei</small>
            </template>
        </q-input><br/>
        <q-input
            filled
            v-model="amount_gwei"
            type="number"
            label="Gwei (Gigawei)"
            @update:model-value="updateUnit('gwei')"
         >
            <template v-slot:append>
                <small class="text-bold">Gwei</small>
            </template>
        </q-input><br/>
        <q-input
            filled
            v-model="amount_ethereum"
            type="number"
            label="Ethereum"
            @update:model-value="updateUnit('ethereum')"
        >
            <template v-slot:append>
                <small class="text-bold">ETH</small>
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
import { ref, computed, onMounted } from 'vue';

import AdsComponent from '../components/AdsComponent.vue';
import { useGeneralStore } from '../stores/general-store';
import { useConverterStore } from 'src/stores/converter-store';

const general = useGeneralStore();
const converter = useConverterStore();
const amount_wei = ref('');
const amount_kwei = ref('');
const amount_mwei = ref('');
const amount_gwei = ref('');
const amount_ethereum = ref('');
const indexPrice = ref(0);
const price_usd = computed(() => {
    const index = converter.list_prices.findIndex(fd => fd.symbol == 'ETH');
    indexPrice.value = index;
    return `Price ETH: ${index >= 0 ? converter.list_prices[index].to_usd : 0} USD`;
});
const total_price = ref('');

const updateUnit = async (type: string) => {
    var amount = 0;

    if (type == 'wei') {
        amount = Number(amount_wei.value) / (10 ** 18);
    } else if (type == 'kwei') {
        amount = Number(amount_kwei.value) / (10 ** 15);
    } else if (type == 'mwei') {
        amount = Number(amount_mwei.value) / (10 ** 12);
    } else if (type == 'gwei') {
        amount = Number(amount_gwei.value) / (10 ** 9);
    } else if (type == 'ethereum') {
        amount = Number(amount_ethereum.value);
    }

    await Promise.all([
        type != 'wei' ? amount_wei.value = general.numberToString(amount * (10 ** 18), 36) : null,
        type != 'kwei' ? amount_kwei.value = general.numberToString(amount * (10 ** 15), 36) : null,
        type != 'mwei' ? amount_mwei.value = general.numberToString(amount * (10 ** 12), 36) : null,
        type != 'gwei' ? amount_gwei.value = general.numberToString(amount * (10 ** 9), 36) : null,
        type != 'ethereum' ? amount_ethereum.value = general.numberToString(amount, 36) : null,
        total_price.value = general.numberToString(amount * Number(converter.list_prices[indexPrice.value].to_usd), 36)
    ]);
};

onMounted(async () => {
  if (converter.list_prices.length == 0) {
    await Promise.all([converter.getPrice()]);
  }
});

defineOptions({
    name: 'EthereumConverterPage'
});
</script>
