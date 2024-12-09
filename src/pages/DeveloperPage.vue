<template>
  <q-page class="q-pa-md">
      <AdsComponent /><br/>
      <q-card flat bordered class="col text-center b-card">
          <q-card-section>
              <p class="text-bold text-h6">About Developer</p>
              <p :class="general.is_mobile ? 'text-small' : ''">Raka WA is a dedicated Blockchain and AI development expert with a wealth of experience in crafting innovative smart contracts, AI-driven systems, and blockchain-integrated solutions. Specializing in developing scalable, secure applications that utilize advanced technologies to achieve significant real-world results.</p>
              <div class="q-gutter-sm">
                <q-btn label="Learn More" color="primary" icon="mdi-arrow-top-right-thick" @click="general.toUrl('https://www.zororaka.my.id/')" />
                <q-btn label="View Source Code" color="secondary" icon="mdi-github" @click="general.toUrl('https://github.com/zororaka00/crypto-converter')" />
              </div><br/>
              <q-btn label="Rapid API Service (Real-Time Multi-Chain Balance Checker)" color="purple" icon="mdi-api" @click="general.toUrl('https://rapidapi.com/rakawidhiantoro/api/real-time-multi-chain-balance-checker')" />
            </q-card-section>
      </q-card><br/>
      <q-card flat bordered class="col text-center b-card">
          <q-card-section>
              <div class="text-h5 text-bold">Support the Developer</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <div class="row q-col-gutter-md justify-center q-mb-md">
              <div class="col-auto">
                <iframe
                  src="https://github.com/sponsors/zororaka00/button"
                  title="Sponsor zororaka00"
                  height="32"
                  width="114"
                  style="border: 0; border-radius: 6px;">
                </iframe>
              </div>
              <div class="col-auto">
                <a href="https://www.patreon.com/bePatron?u=99375677" target="_blank">
                  <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" height="32">
                </a>
              </div>
            </div>

            <q-input filled v-model="btcAddress" label="Bitcoin Address" readonly>
              <template v-slot:append>
                <q-icon name="mdi-content-copy" @click="general.copyClipboard(btcAddress, 'Bitcoin address')" />
              </template>
            </q-input><br/>

            <q-input filled v-model="ethAddress" label="Ethereum Address" readonly>
              <template v-slot:append>
                <q-icon name="mdi-content-copy" @click="general.copyClipboard(ethAddress, 'Ethereum address')" />
              </template>
            </q-input>
          </q-card-section>
      </q-card><br/>
      <ProducthuntComponent />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AdsComponent from '../components/AdsComponent.vue';
import ProducthuntComponent from '../components/ProducthuntComponent.vue';
import { useGeneralStore } from 'src/stores/general-store';

const general = useGeneralStore();
const btcAddress = ref('1EJqFmAKtLfAeVEUU39nrMN78655W4QSLt');
const ethAddress = ref('0x0fFee57EAA1026857E381BC51B6832735006fc6a');

defineOptions({
    name: 'DonatePage'
});
</script>
