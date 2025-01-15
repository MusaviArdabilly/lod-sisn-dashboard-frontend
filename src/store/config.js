import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    config: JSON.parse(localStorage.getItem("config")) || {
      fetchInterval: 1,
      isProtocolBackendSecure: true,
      backendBaseUrl: '',
      isProtocolCTMSecure: true,
      ctmBaseUrl: '',
      ctmName: '',
      ctmUsername: '',
      ctmPassword: '',
      applications: [],
    }
  }),
  actions: {
    resetConfig() {
      this.$reset();
      localStorage.removeItem("config");
    },
    updateConfig(newConfig) {
      this.config = { ...newConfig };
      localStorage.setItem("config", JSON.stringify(this.config));
    }
  }
});
