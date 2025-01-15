<template>
  <div class="relative" 
    @mouseenter="showTooltip = true" 
    @mouseleave="showTooltip = false">
    <slot></slot>
    <div v-if="showTooltip" class="tooltip text-xs">
      {{ content }}
      <div class="arrow-up"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTooltip: false,
    };
  },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background-color: #1a202c;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.arrow-up {
  position: absolute;
  width: 0;
  height: 0;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #1a202c;
}
</style>
