<template>
    <q-card class="text-center" style="max-width: 100%;">
        <div v-if="!general.is_mobile" id='frame' style='width:100%;'><iframe data-aa='2340259' src='//ad.a-ads.com/2340259?size=728x90' style='width:100%; height:90px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe><a style='display: block; text-align: right; font-size: 12px' id='preview-link' href='https://aads.com/campaigns/new/?source_id=2340259&source_type=ad_unit&partner=2340259'>Advertise here</a></div>
        <div v-else id='frame' style='width:320px;'><iframe data-aa='2340260' src='//ad.a-ads.com/2340260?size=320x50' style='width:320px; height:50px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe><a style='display: block; text-align: right; font-size: 12px' id='preview-link' href='https://aads.com/campaigns/new/?source_id=2340260&source_type=ad_unit&partner=2340260'>Advertise here</a></div>
    </q-card>
</template>

<script setup lang="ts">
import { useGeneralStore } from '../stores/general-store';

const general = useGeneralStore();
defineOptions({
    name: 'AdsComponent'
});
</script>
