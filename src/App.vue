<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';

import { useConfigStore } from './store/config'

import axios from 'axios';
import Loading from './components/Loading.vue';

// const { config } = useConfigStore;

const loadingConfig = ref(false);

onMounted(async () => {
  // initiate backendBaseUrl with current origin 
  // original origin = http://localhost:5173/ 
  const [protocol, rest] = window.location.origin.split('://');
  const host = rest.split(':')[0]; // Extract hostname (e.g., "localhost")
  const backendBaseUrl = `${host}`;

  // use :3000 when not using nginx globally
  // const backendBaseUrl = `${host}:3000`;

  useConfigStore().updateConfig({
    isProtocolBackendSecure: protocol === 'https',
    backendBaseUrl: backendBaseUrl
  });

  try {
    const response = await axios.get(`${protocol}://${useConfigStore().config.backendBaseUrl}/api/config`);
    //split the protocol and baseurl first for format as config.js
    const { backendBaseUrl, ctmBaseUrl } = response?.data?.config

    const resBackendBaseUrl = backendBaseUrl?.split('://')[1];
    const resIsBackendSecure = backendBaseUrl?.split(':')[0] === 'https';
    const resCtmBaseUrl = ctmBaseUrl?.split('://')[1];
    const resIsCtmSecure = ctmBaseUrl?.split(':')[0] === 'https';

    const newConfig = { 
      ...response?.data?.config,
      isProtocolBackendSecure: resIsBackendSecure,
      backendBaseUrl: resBackendBaseUrl,
      isProtocolCTMSecure: resIsCtmSecure,
      ctmBaseUrl: resCtmBaseUrl,
    };

    useConfigStore().updateConfig(newConfig);
    // console.log('Config updated from API:', useConfigStore().config);
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('Failed to load configuraiton from API:', error);
  } finally {
    loadingConfig.value = false;
  }
})

</script>

<template>
  <Loading v-if="loadingConfig" />
  <RouterView v-else/>
</template>

<style scoped>

</style>
