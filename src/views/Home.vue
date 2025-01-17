<template>
  <div class="min-h-dvh w-full bg-blue-100 space-y-5 p-2 md:p-5">
    <div class="flex items-center justify-between h-12 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
      <h1 class="text-xl font-bold">Dashboard Readiness</h1>
      <!-- <button class="text-sm rounded border px-2 py-1" @click="generateExportData">Generate Report</button> -->
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <RouterLink v-if="applications?.length > 0" v-for="app of applications"
        :key="app" :to="`/dashboard/${app}`" target="_blank" rel="noopener noreferrer">
          <div class="flex flex-col w-full rounded shadow-md shadow-blue-200 bg-white cursor-pointer space-y-2 p-2 md:p-5 hover:translate-y-1 transition ease-in-out">
            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-7 font-bold text-white rounded bg-blue-500 p-2">
                <h1 class="text-base">{{ app }}</h1>
              </div>
              <div class="col-span-5 font-bold text-white rounded bg-blue-500 p-2">
                <h1 class="text-base">Current Active: 
                  <span>{{ currentActive[app] }}</span>
                </h1>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-2">
              <div :class="{ 'bg-blue-500' : DCI.readiness[app]?.status }" 
                class="col-span-2 flex items-center justify-center text-white rounded bg-blue-300 p-4">
                <h1 class="font-bold text-center">DCI</h1>
              </div>
              <div :class="{ 'bg-blue-500' : DCI.readiness[app]?.status }" 
                class="col-span-10 text-white rounded bg-blue-300 p-4">
                <h1 class="text-sm font-semibold text-center">Readiness {{ app }} DCI</h1>
                <hr class="border-gray-200 my-1">
                <div class="flex justify-center items-center gap-4 ">
                  <h3 class="font-bold text-center">{{ DCI.readiness[app]?.status ? DCI.readiness[app]?.status : 'N/A' }}</h3>
                  <h6 v-if="DCI.readiness[app]?.last_execution"
                    class="text-xs text-center">{{  formatDate(DCI.readiness[app]?.last_execution) }}</h6>
                </div>
              </div>
              <!-- <div :class="{ 'bg-blue-500' : DCI.preImplement[app]?.status }" 
                class="col-span-5 text-white rounded bg-blue-300 p-4">
                <h1 class="text-sm font-semibold text-center">Pre-Implement {{ app }} to DCI</h1>
                <hr class="border-gray-200 my-1">
                <div class="flex justify-center items-center gap-4">
                  <h3 class="font-bold text-center">{{ DCI.preImplement[app]?.status ? DCI.preImplement[app]?.status : 'N/A' }}</h3>
                  <h6 v-if="DCI.preImplement[app]?.last_execution"
                    class="text-xs text-center">{{  formatDate(DCI.preImplement[app]?.last_execution) }}</h6>
                </div>
              </div> -->
              <div :class="{ 'bg-blue-500' : BSD.readiness[app]?.status }"
                class="col-span-2 flex items-center justify-center text-white rounded bg-blue-300 p-4">
                <h1 class="font-bold text-center">BSD</h1>
              </div>
              <div :class="{ 'bg-blue-500' : BSD.readiness[app]?.status }"
                class="col-span-10 text-white rounded bg-blue-300 p-4">
                <h1 class="text-sm font-semibold text-center">Readiness {{ app }} BSD</h1>
                <hr class="border-gray-200 my-1">
                <div class="flex justify-center items-center gap-4">
                  <h3 class="font-bold text-center">{{  BSD.readiness[app]?.status ? BSD.readiness[app]?.status : 'N/A'  }}</h3>
                  <h6 v-if="BSD.readiness[app]?.last_execution"
                    class="text-xs text-center">{{  formatDate(BSD.readiness[app]?.last_execution) }}</h6>
                </div>
              </div>
              <!-- <div :class="{ 'bg-blue-500' : BSD.preImplement[app]?.status }"
                class="col-span-5 text-white rounded bg-blue-300 p-4">
                <h1 class="text-sm font-semibold text-center">Pre-Implement {{ app }} to BSD</h1>
                <hr class="border-gray-200 my-1">
                <div class="flex justify-center items-center gap-4">
                  <h3 class="font-bold text-center">{{ BSD.preImplement[app]?.status ? BSD.preImplement[app]?.status : 'N/A' }}</h3>
                  <h6 v-if="BSD.preImplement[app]?.last_execution"
                    class="text-xs text-center">{{  formatDate(BSD.preImplement[app]?.last_execution) }}</h6>
                </div>
              </div> -->
            </div>
          </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { useConfigStore } from '@/store/config';
import axios from 'axios';

export default {
  data() {
    return {
      applications: [],
      currentActive: {},
      DCI: {
        readiness: {},
        preImplement: {}
      },
      BSD: {
        readiness: {},
        preImplement: {}
      }
    };
  },
  beforeMount() {
    this.applications = useConfigStore().config.applications;
    this.overall();
  },
  mounted() {
    this.applications = useConfigStore().config.applications;
    this.interval = setInterval(() => {
      this.overall();
    }, 5000); // Fetch data every 5 seconds
  },
  beforeDestroy() {
    clearInterval(this.interval); // Clear the interval when the component is destroyed
  },
  computed: {
    config() {
      return useConfigStore().config;
    }
  },
  methods: {
    attachData(response, app) {
      const currentActive = response.data.currentActive?.filter(item => item.name.includes(app));

      if (currentActive.length > 0) {
        if (currentActive[0]?.name.includes('DCI') || currentActive[0]?.name.includes('BSD')) {
          this.currentActive[app] = currentActive.filter(item => 
            item.status === 'Ended OK'
          )[0]?.name.replace(`APP_CHK_${app}_`, '')
        } else {
          this.currentActive[app] = currentActive?.some(item => item.status === 'Ended OK') ? 'DCI' : 'BSD'
        }
      } else {
        this.currentActive[app] = 'N/A'
      }
      
      // Ensure the readiness object for DCI and BSD apps exists before setting status  
      this.DCI.readiness[app] = this.DCI.readiness[app] || {};
      this.BSD.readiness[app] = this.BSD.readiness[app] || {};
      this.DCI.preImplement[app] = this.DCI.preImplement[app] || {};
      this.BSD.preImplement[app] = this.BSD.preImplement[app] || {};

      const readiness = response.data.readiness?.filter(item => item.name.includes(app));
      const preImplement = response.data.preImplement?.filter(item => item.name.includes(app));

      this.DCI.readiness[app].status = readiness?.filter(item => item.name.includes('DCI'))[0]?.status || '';
      this.BSD.readiness[app].status = readiness?.filter(item => item.name.includes('BSD'))[0]?.status || '';
      this.DCI.preImplement[app].status = preImplement?.filter(item => item.name.includes('DCI'))[0]?.status || '';
      this.BSD.preImplement[app].status = preImplement?.filter(item => item.name.includes('BSD'))[0]?.status || '';

      this.DCI.readiness[app].last_execution = readiness?.filter(item => item.name.includes('DCI'))[0]?.start_time || '';
      this.BSD.readiness[app].last_execution = readiness?.filter(item => item.name.includes('BSD'))[0]?.start_time || '';
      this.DCI.preImplement[app].last_execution = preImplement?.filter(item => item.name.includes('DCI'))[0]?.start_time || '';
      this.BSD.preImplement[app].last_execution = preImplement?.filter(item => item.name.includes('BSD'))[0]?.start_time || '';

    },
    async overall() {
      try {
        const BASE_URL = `${this.config.isProtocolBackendSecure ? 'https://' : 'http://'}` + `${this.config.backendBaseUrl}`;

        const response = await axios.get(`${BASE_URL}/api/current-active-and-readiness`);

        if (this.applications?.length > 0) {
          for (const app of this.applications) {
            this.attachData(response, app)
          }
        }

      } catch (error) {
        console.log(error)
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
  
      date.setUTCHours(date.getUTCHours() + Number(`${import.meta.env.VITE_TIME_ZONE_OFFSET}`));

      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');

      return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    },
    async generateExportData() {
      await this.$router.push({ name: 'Report' });
    }
  }
}
</script>
