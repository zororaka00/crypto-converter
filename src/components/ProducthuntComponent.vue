<template>
    <a v-if="!general.is_mobile" href="https://www.producthunt.com/posts/crypto-converter?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-crypto&#0045;converter" target="_blank">
        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473629&theme=light" alt="Crypto&#0032;Converter - Simplify&#0032;Crypto&#0032;Converter&#0032;Tools | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
    </a>
</template>

<script setup lang="ts">
import { useGeneralStore } from '../stores/general-store';

const general = useGeneralStore();
defineOptions({
    name: 'ProducthuntComponent'
});
</script>