<template>
  <q-page class="q-pa-md">
      <AdsComponent /><br/>
      <q-card flat bordered class="col text-center b-card">
          <q-card-section>
              <p class="text-bold text-h6">About Developer</p>
              <p :class="general.is_mobile ? 'text-small' : ''">Raka WA is a dedicated Blockchain and AI development expert with a wealth of experience in crafting innovative smart contracts, AI-driven systems, and blockchain-integrated solutions. Specializing in developing scalable, secure applications that utilize advanced technologies to achieve significant real-world results.</p>
              <q-btn label="Learn More" color="primary" @click="general.toUrl('https://www.zororaka.my.id/')" />
            </q-card-section>
      </q-card><br/>
      <q-card flat bordered class="col text-center b-card">
          <q-card-section>
              <div class="text-h5 text-bold">Donate to Developer</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
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
