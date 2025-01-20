<template>
  <div class="flex flex-col h-dvh items-center justify-center">
    <div class="flex gap-4">
      <h1></h1>
    </div>

    <div class="max-w-3xl w-full border rounded-lg shadow mx-auto p-4">
      <div class="flex items-center justify-between gap-4">
        <h3 class="font-semibold">Setup Config</h3>
        <div class="relative inline-block text-left">
          <button v-if="!isEditing"
            type="button" class="font-semibold group px-1 py-1"
            @click="toggleDropdown">
            <svg class="fill-slate-500 group-hover:fill-slate-700" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
          </button>
          <div class="absolute right-0 w-max origin-top-right rounded-lg shadow border bg-white z-10 mt-2 focus:outline-none" tabindex="-1"
            :class="{ 'hidden' : isDropdownHidden }">
            <div class="py-1" role="none">
              <a href="#" class="block text-sm text-slate-500 px-4 py-2 hover:bg-slate-100"
                @click="toggleDropdown(); toggleEdit()">Edit</a>
              <a href="#" class="block text-sm text-slate-500 px-4 py-2 hover:bg-slate-100"
                @click="checkConfig(); isCheckingConfig = true; isDropdownHidden = true">Check</a>
              <!-- <a href="#" class="block text-sm text-slate-500 px-4 py-2 hover:bg-slate-100">Get Current Config</a> -->
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4">
      <div class="space-y-4">
        <div class="flex gap-4">
          <div class="w-full space-y-1">
            <h5 class="text-sm text-slate-500">Syncronization Interval</h5>
            <div class="flex items-center gap-2">
              <input class="w-10 rounded border px-2 py-1" 
                v-model="config.fetchInterval" :disabled="!isEditing">
              <h5>Minutes</h5>
            </div>
            <h6 class="text-xs text-slate-400 italic">Interval for get data from Control M API: <span class="font-bold">(1 - 59 minutes)</span></h6>
          </div>
          <div class="w-full space-y-1">
            <h5 class="text-sm text-slate-500">Backend Base Url</h5>
            <div class="flex gap-2">
              <select name="backendBaseUrl" class="rounded border px-2 py-[0.35rem]" 
                v-model="config.isProtocolBackendSecure" :disabled="!isEditing">
                <option :value="false" 
                  :selected="!config.isProtocolBackendSecure">http://</option>
                <option :value="true" 
                  :selected="config.isProtocolBackendSecure">https://</option>
              </select>
              <input class="w-full rounded border px-2 py-1" 
                v-model="config.backendBaseUrl" :disabled="!isEditing">
            </div>
            <h6 class="text-xs text-slate-400 italic">Use IP if Domain is not working</h6>
          </div>
        </div>
        <div class="flex gap-4">
          <div :class="{ 'rounded-lg border-l-[1rem] border-2 p-2': isCheckingConfig,
            'border-gray-500': isFetching,
            'border-green-500': isCTMCorrect,
            'border-red-500': !isCTMCorrect }"
            class="w-full space-y-1">
            <h5 class="text-sm text-slate-500">Control M API Base Url</h5>
            <div class="flex gap-2">
              <select name="backendBaseUrl" class="rounded border px-2 py-[0.35rem]" 
                v-model="config.isProtocolCTMSecure" :disabled="!isEditing">
                <option :value="false"
                  :selected="!config.isProtocolCTMSecure">http://</option>
                <option :value="true"
                  :selected="config.isProtocolCTMSecure">https://</option>
              </select>
              <input class="w-full rounded border px-2 py-1"
                v-model="config.ctmBaseUrl" :disabled="!isEditing">
            </div>
            <h6 class="text-xs text-slate-400 italic">Use IP if Domain is not working</h6>
          </div>
          <div class="w-full space-y-1">
            <h5 class="text-sm text-slate-500">Control M name</h5>
            <input class="w-full rounded border px-2 py-1"
              v-model="config.ctmName" :disabled="!isEditing">
            <h6 class="text-xs text-slate-400 italic">Name of Control M</h6>
          </div>
        </div>
        <div :class="{ 'rounded-lg border-l-[1rem] border-2 p-2': isCheckingConfig,
            'border-gray-500': isFetching,
            'border-green-500': isAuthCorrect,
            'border-red-500': !isAuthCorrect }"
          class="flex gap-4">
          <div class="w-full space-y-2">
            <h5 class="text-sm text-slate-500">Control M Username</h5>
            <input class="w-full rounded border px-2 py-1"
              v-model="config.ctmUsername" :disabled="!isEditing">
            <h6 class="text-xs text-slate-400 italic">For generate token</h6>
          </div>
          <div class="w-full space-y-2">
            <h5 class="text-sm text-slate-500">Control M Password</h5>
            <input class="w-full rounded border px-2 py-1"
              :type="showActualPassword ? 'text' : 'password'"    
              v-model="config.ctmPassword"
              @focus="showActualPassword = true"
              @blur="showActualPassword = false"
              :disabled="!isEditing">
            <h6 class="text-xs text-slate-400 italic">Leave empty or as it is if password is same as old password</h6>
          </div>
          <!-- <h5>curl: </h5> -->
        </div>
        <div class="w-full space-y-1">
          <h5 class="text-sm text-slate-500">Application List</h5>
          <div class="flex rounded border px-2 py-2 gap-2">
            <span v-if="config.applications?.length > 0" 
              v-for="app, index in config.applications" :key="index"
              class="flex w-max items-center rounded border px-2 py-1 gap-4">
              <label>{{ app }}</label>
              <div class="rounded border cursor-pointer hover:bg-slate-300"
                :class="{ 'hidden' : !isEditing }"
                @click="removeApp(app)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
              </div>
            </span>
          </div>
          <div class="flex items-center gap-2"
            :class="{ 'hidden' : !isEditing }">
            <input class="w-1/2 rounded border px-2 py-1" placeholder="App name"
              v-model="newApp">
            <div class="rounded bg-blue-500 text-white cursor-pointer px-2 py-1 hover:bg-blue-600"
              @click="insertApp()">
              <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <div class="w-max rounded border border-white bg-blue-500 text-white px-2 py-1 cursor-pointer hover:bg-blue-600"
            :class="{ 'hidden' : !isEditing }"
            @click="saveEdit()">
            Save
          </div>
        </div>
        <Toast v-if="successToastVisible" type="success" message="Config updated successfully!" />
        <Toast v-if="errorToastVisible" type="error" message="Something went wrong!" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px; /* Adjust as needed */
  left: 20px;   /* Adjust as needed */
  z-index: 1000; /* Ensure it's above other elements */
}
</style>

<script>
import { useConfigStore } from '../store/config';
import axios from 'axios';

import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast
  },
  data() {
    return {
      successToastVisible: false,
      errorToastVisible: false,
      isDropdownHidden: true,
      isEditing: false,
      showActualPassword: false,
      newApp: '',
      isCheckingConfig: false,
      isFetching: false,
      isAuthCorrect: false,
      isCTMCorrect: false
    }
  },
  mounted() {
    document.title = 'Setting'
  },
  computed: {
    config() {
      // Access the config store and return its config object
      return useConfigStore().config;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownHidden = !this.isDropdownHidden;
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    insertApp() {
      this.config.applications.push(this.newApp);
      this.newApp = '';
    },
    removeApp(appName) {
      const index = this.config.applications.indexOf(appName);
      if (index !== -1) {
        this.config.applications.splice(index, 1)
        if (this.config.applications.length === 1 && this.config.applications[0] === '') {
          this.config.applications = [];
        }
      }
    },
    async saveEdit() {
      try {
        const currentBaseUrl = (this.config.isProtocolBackendSecure ? 'https://' : 'http://') 
          + this.config.backendBaseUrl;
        const ctmBaseUrl = (this.config.isProtocolCTMSecure ? 'https://' : 'http://') 
          + this.config.ctmBaseUrl;

        const token = localStorage.getItem('a_token');
        const response = await axios.put(`${currentBaseUrl}/api/config`, {
          'fetchInterval': this.config.fetchInterval,
          'currentBaseUrl': currentBaseUrl,
          'ctmBaseUrl': ctmBaseUrl,
          'ctmName': this.config.ctmName,
          'ctmUsername': this.config.ctmUsername,
          'ctmPassword': this.config.ctmPassword,
          'applications': this.config.applications
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log(response.status, response.data);

        useConfigStore().updateConfig(this.config);
        this.isEditing = false;

        this.successToastVisible = true;
        setTimeout(() => {
          this.successToastVisible = false;
        }, 3000)
      } catch  (error) {
        this.isEditing = true;
        console.log(error);
        this.errorToastVisible = true;
        setTimeout(() => {
          this.errorToastVisible = false;
        }, 5000);
      } 
    },
    async checkConfig() {
      try {
        this.isFetching = true;
        const backendBaseUrl = (this.config.isProtocolBackendSecure ? 'https://' : 'http://') 
          + this.config.backendBaseUrl;
        
        const token = localStorage.getItem('a_token');
        const response = await axios.get(`${backendBaseUrl}/api/config/check`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.isAuthCorrect = response.data.checkAuth;
        this.isCTMCorrect = response.data.checkCTM;
      } catch (error) {
        console.log(error.message)
      } finally {
        this.isFetching = false;
      }
    }
  }
}
</script>