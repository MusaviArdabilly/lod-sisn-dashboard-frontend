<template>
  <div class="fixed bottom-10 left-10">
    <div v-if="visible" :class="toastClass" class="flex items-center py-2 px-3 shadow-md mb-2">
      <!-- Icons -->
      <div :class="iconClass" class="rounded-full bg-white mr-3">
        <svg
          v-if="type === 'success'"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          class="bi bi-check"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
          />
        </svg>
        <svg
          v-if="type === 'error'"
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          class="bi bi-x"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
          />
          <path
            fill-rule="evenodd"
            d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
          />
        </svg>
      </div>
      <!-- Message -->
      <div class="text-white max-w-xs">{{ message }}</div>
      <button @click="closeToast" class="ms-4 text-white">X</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    toastClass() {
      return this.type === 'success'
        ? 'bg-green-500 border-l-4 border-green-700'
        : 'bg-red-500 border-l-4 border-red-700';
    },
    iconClass() {
      return this.type === 'success' ? 'text-green-500' : 'text-red-500';
    },
  },
  methods: {
    closeToast() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
/* Optional: You can add custom styles here */
</style>
