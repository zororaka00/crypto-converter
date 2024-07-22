<template>
<q-page class="q-pa-md">
    <AdsComponent /><br/>
    <q-card flat bordered class="col text-center b-card">
        <q-card-section>
            <div class="text-h5 text-bold">Ethereum Liquid Staking</div>
            <div class="text-small text-italic">List Platform Best APR</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
            <div v-for="liquid_staking in converter.list_liquid_staking">
                <q-input
                    filled
                    v-model="liquid_staking.apr"
                    :label="liquid_staking.label"
                    readonly
                    >
                    <template v-slot:append>
                        <q-btn filled color="primary" label="Go Stake" @click="general.toUrl(liquid_staking.url)" />
                    </template>
                </q-input><br/>
            </div>
        </q-card-section>
    </q-card>
</q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import AdsComponent from '../components/AdsComponent.vue';
import { useGeneralStore } from '../stores/general-store';
import { useConverterStore } from '../stores/converter-store';

const general = useGeneralStore();
const converter = useConverterStore();

onMounted(() => converter.getLiquidStaking());

defineOptions({
    name: 'EthereumLiquidStakingPage'
});
</script>
