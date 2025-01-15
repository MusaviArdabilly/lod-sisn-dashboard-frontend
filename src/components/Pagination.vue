<template>
  <div class="flex flex-col items-center md:space-y-0 md:flex-row md:justify-between space-y-3 text-sm font-regular">
    <!-- Items Per Page Selector -->
    <div>
      <span>Showing</span>
      <select 
        name="" 
        id="" 
        class="border border-blue-500 rounded cursor-pointer mx-2 py-1 px-2"
        @change="changeItemsPerPage($event)"
      >
        <option v-for="size in [10, 15, 20, 25, 50, 100]" :key="size" :value="size">{{ size }}</option>
      </select>
      <span>of Total {{ totalItems }} Data</span>
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center">
      <!-- Previous Page Button -->
      <button
        class="flex justify-center border border-blue-500 rounded-l p-2"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="12">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
        </svg>
      </button>

      <!-- Page Numbers with Ellipsis -->
      <div class="divide-x">
        <button
          v-for="page in paginatedPages"
          class="border-y border-blue-500 px-2 py-1"
          :key="page"
          :class="{ active: currentPage === page, 'cursor-default': page === '...' }"
          @click="changePage(page)"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Page Button -->
      <button
        class="flex justify-center border border-blue-500 rounded-r p-2"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="12">
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 30px;
}
button:hover:not([disabled], .active) {
  background-color: rgb(219 234 254);
  color: #000;
}
button[disabled] svg path {
  fill: rgb(148 163 184);
}
button.active {
  background-color: #3B82F6;
  color: white;
}
button.cursor-default {
  cursor: default;
}
</style>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    paginatedPages() {
      const total = this.totalPages;
      const current = this.currentPage;
      // define the maximum number of page buttons to display
      const maxButtons = 4;
      // initialize an array to store the pagination buttons
      let pages = [];

      // always show the first page
      if (total > 0) {
        pages.push(1);
      }

      // Determine the pages to show after the first page
      if (total <= maxButtons) {
        for (let i = 2; i <= total; i++) { // if total pages are less than or equal to maxButtons, show all pages
          pages.push(i);
        }
      } else {
        if (current > 2) { // if total pages are more than maxButtons, add middle ellipsis
          pages.push('...'); // show "..." if we are beyond the second page
        }

        // add pages around the current page
        let startPage = Math.max(2, current - 1);
        let endPage = Math.min(total - 1, current + 1);

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        if (endPage < total - 1) { // show "..." if there are pages after the current window 
          pages.push('...');
        }
        if (total > 1) { // always show the last page
          pages.push(total);
        }
      }
      return pages;
    }
  },
  methods: {
    changePage(page) {
      if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    },
    changeItemsPerPage(event) {
      const newItemsPerPage = parseInt(event.target.value, 10);
      this.$emit('items-per-page-changed', newItemsPerPage);
    }
  }
};
</script>
