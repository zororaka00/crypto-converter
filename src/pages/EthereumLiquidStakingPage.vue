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
                        <q-btn v-if="!general.is_mobile" filled color="primary" label="Go Stake" @click="general.toUrl(liquid_staking.url)" />
                        <q-btn v-else filled color="primary" label="Copy Link" @click="general.copyClipboard(liquid_staking.url, 'Link copied')" />
                    </template>
                </q-input><br/>
            </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
            <p class="text-bold text-h6">What is Ethereum Liquid Staking?</p>
            Ethereum Liquid Staking is a process where Ethereum holders can lock their ETH into staking protocols to help secure the Ethereum network while maintaining liquidity. This is done through third-party platforms that offer tokens representing the staked ETH. Consequently, users can still transact, trade, or use these tokens in decentralized finance (DeFi) applications even though their ETH is locked in staking. This process allows ETH holders to earn staking rewards without sacrificing the flexibility of using their assets.
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

onMounted(() => {
    if (converter.list_liquid_staking[0].value_apr == 0) {
        converter.getLiquidStaking();
    }
});

defineOptions({
    name: 'EthereumLiquidStakingPage'
});
</script>
